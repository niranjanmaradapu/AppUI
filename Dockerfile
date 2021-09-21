FROM node:12.18.3
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
COPY src /app/src
COPY public  /app 
EXPOSE 3000
WORKDIR /app/src
CMD ["npm", "start"]