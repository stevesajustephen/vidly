FROM node:latest


ENV NODE_ENV=development 
ENV PORT=3001

COPY      . /var/www
WORKDIR   /var/www

RUN       npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]