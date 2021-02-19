FROM node:alpine
WORKDIR /usr/src/helper_app
RUN apk update
RUN apk add bash python g++ make postgresql-client yarn

COPY ./package*.json /usr/src/helper_app/

RUN yarn

ADD ./.sequelizerc /usr/src/helper_app/.sequelizerc
ADD ./database /usr/src/helper_app/database
ADD ./server /usr/src/helper_app/server

EXPOSE 3000

ADD ./entrypoint.sh /usr/src/helper_app/entrypoint.sh

RUN chmod +x /usr/src/helper_app/entrypoint.sh
ENTRYPOINT [ "/usr/src/helper_app/entrypoint.sh" ]