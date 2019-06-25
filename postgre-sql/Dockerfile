FROM postgres:latest
LABEL maintainer=${MAINTAINER}
EXPOSE ${PORT}
COPY .env ./
COPY database.sh ./docker-entrypoint-initdb.d/
COPY database.sh ./
RUN chmod +x ./database.sh
ENTRYPOINT sleep 5 && ./database.sh && /bin/bash