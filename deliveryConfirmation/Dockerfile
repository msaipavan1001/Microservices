FROM node:14
WORKDIR /usr/src/app
COPY package*.json app.js ./
RUN npm install
COPY . .
EXPOSE 4002
CMD ["npm", "app.js"]