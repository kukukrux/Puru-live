# Use arm32v8 to run on Raspberry Pi 3
FROM arm64v8/node:16.17.1-alpine

WORKDIR /usr/src/Puru

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install -g yarn
RUN yarn install
COPY . .
RUN ls -a

#CMD [ "node", "index.js" ]
CMD ["yarn", "start"]