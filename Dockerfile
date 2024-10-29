FROM node:latest
WORKDIR /app
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY . .
RUN rm -rf node_modules package-lock.json

RUN npm i
RUN npm install @rollup/rollup-linux-x64-gnu --save
RUN npm run build
