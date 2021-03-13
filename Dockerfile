FROM node
WORKDIR /app
ADD . /app
RUN touch config.json
RUN npm i --save-dev
RUN npx tsc
ENTRYPOINT ["node", "./out/main.js"]