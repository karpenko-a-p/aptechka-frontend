FROM node:24.2.0-alpine3.22
WORKDIR frontend-app
COPY package*.json .
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]