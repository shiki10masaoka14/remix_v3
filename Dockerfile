FROM node:16-alpine3.14
RUN apk update && \
        apk add git

FROM node:16-alpine3.14
WORKDIR /workspace
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]