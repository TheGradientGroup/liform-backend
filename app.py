from io import StringIO

import os
import pandas as pd
from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from bson.objectid import ObjectId
from bson.json_util import dumps
import requests

import docs
import models.model as model

app = Flask(__name__)
CORS(app)


@app.route('/')
def hi():
    res = 'Liform API 1.0'
    return Response(res, content_type='text/plain')


@app.route('/import/drgs', methods=['POST'])
def import_drgs():
    if request.content_type != 'text/csv':
        return jsonify({'error': 'invalid-content-type'}), 400
    df = pd.read_csv(StringIO(request.data.decode('utf8')))
    if len(df.columns) != 3 or df.columns[0] != 'DRG' or df.columns[1] != 'Desc' or df.columns[2] != 'HumanDesc':
        return jsonify({'error': 'invalid-columns'}), 400
    drg_models = []
    for idx, series in df.iterrows():
        drg_models.append(model.DRG(series['DRG'], series['Desc'], series['HumanDesc']))
    model.DRG.objects.bulk_create(drg_models)
    return Response('ok', content_type='text/plain')


@app.route('/docs/import/drgs')
def import_drgs_doc():
    return Response(docs.import_drgs.doc(), content_type='text/plain')


@app.route('/search/drgs/<query>')
def search_drgs(query):
    docs = model.DRG.objects.raw({'$text': {'$search': query}})
    docs_arr = []
    for doc in docs:
        if len(docs_arr) > 15:
            break
        cur_doc = doc.to_son().to_dict()
        del cur_doc['_id']
        del cur_doc['_cls']
        del cur_doc['name']
        docs_arr.append(cur_doc)
    print(docs_arr)
    return jsonify(docs_arr), 200


@app.route('/docs/search/drgs')
def search_drgs_doc():
    return Response(docs.search_drgs.doc(), content_type='text/plain')


@app.route('/info/<drg>')
def drg_info(drg):
    try:
        objects = model.DRG.objects.raw({'drg': int(drg)})
        obj = next(objects).to_son().to_dict()
        del obj['_id']
        del obj['_cls']
        return jsonify(obj)
    except (StopIteration, ValueError):
        return jsonify({'error': 'drg-not-found'}), 404


@app.route('/import/step/1', methods=['POST'])
def import_step1():
    df = pd.read_excel(request.files['sheet'])
    return jsonify(df.columns.values.tolist())


@app.route('/import/step/2', methods=['POST'])
def import_step2():
    df = pd.read_excel(request.files['sheet'])
    if set(request.form.keys()) != {'providerName', 'city', 'state', 'lat', 'lon', 'drgIndex', 'priceIndex'}:
        return jsonify({'error': 'incomplete-data'}), 400
    if not request.form['drgIndex'].isdigit() or not request.form['priceIndex'].isdigit():
        return jsonify({'error': 'incompatible-data-types'}), 400
    hospital_drgs = []
    for idx, row in df.iterrows():
        drg_code = row[int(request.form['drgIndex'])]
        price = row[int(request.form['priceIndex'])]
        objs = list(model.DRG.objects.raw({'drg': drg_code}))
        if not len(objs) == 1:
            continue
        hospital_drgs.append(model.DRGData(drg=objs[0], avg=float(price)))
    new_hospital = model.Hospital(
        name=request.form['providerName'],
        city=request.form['city'],
        state=request.form['state'],
        location=[float(request.form['lon']), float(request.form['lat'])],  # remember, it's stored lon,lat
        avg_reported=hospital_drgs
    )
    new_hospital.save()
    return Response('ok', content_type='text/plain')


@app.route('/nearme/<drg>/<lat>/<lon>', methods=['GET'])
def nearme_drg(drg, lat, lon):
    print(drg, lat, lon)
    drg_ref = next(model.DRG.objects.raw({'drg': int(drg)}))
    query = model.Hospital.objects.raw({
        'location': {
            '$near': {
                '$geometry': {
                    'type': 'Point',
                    'coordinates': [float(lon), float(lat)]
                },
                '$maxDistance': 5000
            }
        },
        'avg_reported.drg': {
            '$eq': ObjectId(drg_ref._id)
        }
    })
    query = query.project({
        'name': 1,
        'city': 1,
        'state': 1,
        'location': 1,
        'avg_reported.$': 1,
    })
    results = dumps([x.to_son().to_dict() for x in list(query)])
    print(results)
    return Response(results, content_type='application/json'), 200


@app.route('/stats/<drg>/national', methods=['GET'])
def national_drg_stats(drg):
    drg_ref = list(model.DRG.objects.raw({'drg': int(drg)}))
    if len(drg_ref) == 0 or len(drg_ref) > 1:
        return jsonify({'error': 'drg-not-found'}), 404
    query = model.Hospital.objects.aggregate(
        {
            '$match': {
                'avg_reported.drg': ObjectId(drg_ref[0]._id)
            }
        },
        {'$unwind': '$avg_reported'},
        {'$match': {'avg_reported.drg': ObjectId(drg_ref[0]._id)}},
        {
            '$group': {
                '_id': None,
                'avg': {'$avg': '$avg_reported.avg'},
                'min': {'$min': '$avg_reported.avg'},
                'max': {'$max': '$avg_reported.avg'}
            }
        }
    )
    return jsonify(list(query)), 200


@app.route('/stats/<drg>/<state>', methods=['GET'])
def state_drg_stats(drg, state):
    drg_ref = list(model.DRG.objects.raw({'drg': int(drg)}))
    if len(drg_ref) == 0 or len(drg_ref) > 1:
        return jsonify({'error': 'drg-not-found'}), 404
    query = model.Hospital.objects.aggregate(
        {
            '$match': {
                'avg_reported.drg': ObjectId(drg_ref[0]._id),
                'state': state
            }
        },
        {'$unwind': '$avg_reported'},
        {'$match': {'avg_reported.drg': ObjectId(drg_ref[0]._id)}},
        {
            '$group': {
                '_id': None,
                'avg': {'$avg': '$avg_reported.avg'},
                'min': {'$min': '$avg_reported.avg'},
                'max': {'$max': '$avg_reported.avg'}
            }
        }
    )
    return jsonify(list(query)), 200


@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({'error': 'invalid-usage'}), 405


@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'not-found'}), 404


if __name__ == '__main__':
    app.run()
