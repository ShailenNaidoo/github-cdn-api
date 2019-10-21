FROM node:12.9.1-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN npm i -g yarn && yarn install

COPY index.ts .
COPY github-wrapper.ts .
COPY tsconfig.json .
COPY yarn.lock .

EXPOSE 8000

CMD [ "npx", "ts-node", "index.ts" ]