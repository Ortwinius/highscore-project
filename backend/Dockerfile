# docker image to run app in docker container

# COPY ./src/package.json src/package-lock.json ./

# Setup
FROM node:20-alpine

RUN npm ci && mkdir /

# change directory
WORKDIR /app

COPY --from=builder /app/ /app/

# use port 3000
EXPOSE 3000

CMD ["node", "./bin/www"]

# to run/start: 
# docker run -it -d -p 1234:3000 --name demo demo-node:latest /bin/sh
# -it for interactive -d for detached (background) -p for port
#
# to connect to started docker:
# docker exec --help
#
# to stop:
# docker stop