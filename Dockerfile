FROM node:latest


ENV NODE_ENV=development 
ENV PORT=3000
ENV my_secret=to be set

COPY      . /var/www
WORKDIR   /var/www

RUN       npm install

EXPOSE $PORT

ENTRYPOINT ["yarn", "start"]