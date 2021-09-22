FROM node:12.18.3
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
COPY src /app/src
COPY public  /app
EXPOSE 300
CMD ["npm", "start"]