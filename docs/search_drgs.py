def doc():
    return '''
GET /search/drgs/<treatment_name>
    url_param: <treatment_name> - treatment to search for
    returns: JSON array (can be empty) [{"drg": int, "human_name": string}, ...]
    '''
