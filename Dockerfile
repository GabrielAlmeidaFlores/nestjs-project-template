
FROM node:22.15.0 AS builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM node:22.15.0 AS runtime
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libgbm-dev \
    libxshmfence-dev \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN npx puppeteer browsers install chrome

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

COPY --from=builder /usr/src/app/dist ./dist
COPY ./assets ./assets

user NODE

CMD ["node", "dist/main"]
