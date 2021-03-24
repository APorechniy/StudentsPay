FROM node:12.14.0

EXPOSE 8080

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN yarn
RUN yarn build
CMD [ "yarn", "start" ]
