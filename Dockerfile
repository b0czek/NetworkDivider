FROM nginx:stable-alpine


RUN apk add --no-cache uwsgi-python3 python3 py3-pip supervisor npm  \
        && rm -rf /tmp/* /var/cache/apk/* \ 
        && mkdir /www


ADD api /usr/src/app
ADD etc /etc

RUN pip3 install --no-cache-dir -r /usr/src/app/requirements.txt

ADD network-divider /usr/src/network-divider
WORKDIR /usr/src/network-divider
RUN npm install --production \
        && npm run build \
        && mv build/* /www/

WORKDIR /root

RUN rm -rf /usr/src/network-divider \
        && npm cache clean --force \
        && apk del npm nodejs \
        && rm -rf /tmp/* /var/cache/apk/*

RUN chown -R nginx:nginx /www


EXPOSE 80
ENTRYPOINT ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf" ]