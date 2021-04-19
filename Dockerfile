FROM nginx:stable-alpine


RUN apk add --no-cache uwsgi-python3 python3 py3-pip supervisor  \
        && rm -rf /tmp/* /var/cache/apk/* \ 
        && mkdir /www

WORKDIR /usr/src/app

ADD api .
ADD etc /etc
ADD network-divider/build /www

RUN chown -R nginx:nginx /www

RUN pip3 install --no-cache-dir -r requirements.txt

EXPOSE 80
ENTRYPOINT ["/usr/bin/supervisord"]