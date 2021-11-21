FROM node:lts 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build
EXPOSE 8080
CMD ["npm","start"]