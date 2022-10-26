# Use arm32v8 to run on Raspberry Pi 3
FROM arm64v8/node:16.17.1-alpine

WORKDIR /usr/src/Puru

RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev

COPY package*.json ./
COPY tsconfig.json ./

RUN yarn install
COPY . .
RUN ls -a

#CMD [ "node", "index.js" ]
CMD ["yarn", "start"]