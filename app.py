from io import StringIO

import pandas as pd
from flask import Flask, Response, request, jsonify

import docs
import models.model as model

app = Flask(__name__)


@app.route('/')
def hello_world():
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
    print(query)
    docs = model.DRG.objects.raw({'$text': {'$search': query}})
    docs_arr = []
    for doc in docs:
        if len(docs_arr) > 5:
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


@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({'error': 'invalid-usage'}), 405


@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'not-found'}), 404


if __name__ == '__main__':
    app.run()
