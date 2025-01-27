FROM node:20.11.0
WORKDIR /app
COPY ./package.json .
RUN npm i --legacy-peer-deps
COPY . ./
RUN npm run build

FROM alpine:latest AS export-static

WORKDIR /app

# Создание папки /app/build
RUN mkdir -p /app/build

# Копирование файлов из /app/dist (со стадии сборки) в /app/build
COPY --from=build /app/dist/. /app/build/

# Завершение работы контейнера
CMD ["echo", "Static files copied to /app/build"]
