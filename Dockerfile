FROM node:16.14.2
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
# Build server file
RUN yarn config set registry https://registry.npmmirror.com
RUN yarn install
RUN yarn build
# Bundle app source
EXPOSE 4173
CMD [ "yarn", "preview" ]