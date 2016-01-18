FROM node:4.2.2
ENV NODE_ENV 'production'

ADD ./app/package.json /tmp/package.json
ADD ./README.md /tmp/README.md
RUN cd /tmp && npm install && mv /tmp/node_modules /node_modules
ADD ./app /code

RUN apt-get update -q && \
    apt-get install python3-pip -y && \
    pip3 install chaperone && apt-get clean && rm -rf /tmp/* /var/tmp/*
COPY chaperone.conf /etc/chaperone.d/chaperone.conf

RUN useradd -m 500 && usermod -u 500 500
USER 500
ENTRYPOINT ["/usr/local/bin/chaperone"]
