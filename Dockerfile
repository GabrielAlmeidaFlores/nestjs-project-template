
FROM node:22.15.0 AS builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM node:22.15.0 AS runtime
WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

COPY --from=builder /usr/src/app/dist ./dist
COPY ./assets ./assets

RUN chown -R node:node /usr/src/app

USER node

CMD ["node", "dist/main"]
