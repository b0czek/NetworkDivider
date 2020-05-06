

def application(env, start_response):
    try:
        request_body_size = int(env.get('CONTENT_LENGTH', 0))
    except (ValueError):
        request_body_size = 0
    request_body = env['wsgi.input'].read(request_body_size)
    print(request_body)
    start_response('200 OK', [('Content-Type','text/html')])

    return [b"zzzz"]