FROM node:14
WORKDIR /usr/src/app
COPY package*.json app.js ./
RUN npm install
COPY . .
EXPOSE 4001
CMD ["npm", "app.js"]