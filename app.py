from io import StringIO

import pandas as pd
from flask import Flask, Response, request, jsonify

import docs

app = Flask(__name__)


@app.route('/')
def hello_world():
    res = 'Liform API 1.0'
    return Response(res, content_type='text/plain')


@app.route('/docs/import/drgs')
def import_drgs_doc():
    return Response(docs.import_drgs.doc(), content_type='text/plain')

@app.route('/import/drgs', methods=['POST'])
def import_drgs():
    df = pd.read_csv(StringIO(request.data.decode('utf8')))
    # TODO: implement the rest of the stuff here

    return Response('ok', content_type='text/plain')


@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({'error': 'invalid-usage'}), 405


@app.errorhandler(404)
def method_not_allowed(e):
    return jsonify({'error': 'not-found'}), 404

if __name__ == '__main__':
    app.run()
