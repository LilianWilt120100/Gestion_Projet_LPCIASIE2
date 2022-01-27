FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /server

COPY . ./

RUN apk update \
  && apk upgrade -U -a \
  && npm ci

EXPOSE 3000

CMD npm run start