from io import StringIO

import pandas as pd
from flask import Flask, Response, request, jsonify

app = Flask(__name__)


@app.route('/')
def hello_world():
    res = 'Liform API 1.0'
    return Response(res, content_type='text/plain')


@app.route('/import/drgs', methods=['POST'])
def import_drgs():
    df = pd.read_csv(StringIO(request.data.decode('utf8')))
    return 'ok'


@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({'error': 'invalid-usage'}), 405


if __name__ == '__main__':
    app.run()
