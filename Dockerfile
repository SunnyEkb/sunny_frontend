FROM node:20.11.0
WORKDIR /app
COPY ./package.json .
RUN npm i --legacy-peer-deps
COPY . ./
RUN npm run build
CMD ["npm", "run", "dev" ]
