def doc():
    return '''
POST /import/drgs
    body: CSV file with columns "DRG" and "Desc"
    content-type: text/csv
    returns: HTTP 200, 'ok' response
    '''
