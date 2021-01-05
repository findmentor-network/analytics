# Build #
FROM node:15-buster as build
WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install

COPY src ./src/

# Final Image #
FROM alpine
WORKDIR /usr/app

RUN apk add nodejs npm
COPY --from=build /usr/app ./

ENTRYPOINT ["node", "src"]
