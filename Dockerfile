FROM node:20-alpine

WORKDIR /fe-chatgpt

COPY package.json package-lock.json ./

RUN npm i

COPY . .

EXPOSE 4200 4201 4176 9000

CMD ["npm", "run", "serve"]