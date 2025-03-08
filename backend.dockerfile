FROM node:alpine

ARG SEARXNG_API_URL
ENV SEARXNG_API_URL=${SEARXNG_API_URL}

WORKDIR /home/NativeGen

COPY src /home/NativeGen/src
COPY tsconfig.json /home/NativeGen/
COPY .env /home/NativeGen/
COPY package.json /home/NativeGen/
COPY package-lock.json /home/NativeGen/ 

RUN npm install
RUN npm run build

CMD ["npm","start"]
