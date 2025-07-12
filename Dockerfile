from node:22.13.1
WORKDIR /tybachallenge
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]