FROM node:16.13-alpine

WORKDIR /usr/app
COPY . .

RUN yarn install
RUN ENV=production yarn build

CMD ["yarn", "start"]