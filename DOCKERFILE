FROM node
WORKDIR /app
ADD . /app
RUN touch config.json
RUN npm i
RUN npx tsc
ENTRYPOINT ["node", "./out/main.js"]