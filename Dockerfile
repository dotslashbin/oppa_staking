FROM node:lts as dependencies
WORKDIR /my-project
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /my-project
COPY . .
COPY --from=dependencies /my-project/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /oppa
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /oppa/next.config.js ./
COPY --from=builder /oppa/public ./public
COPY --from=builder /oppa/.next ./.next
COPY --from=builder /oppa/node_modules ./node_modules
COPY --from=builder /oppa/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]