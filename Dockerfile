# Node 12 LTS 
FROM node:12

# Create app directory
WORKDIR /usr/src/event-explorer

# Install app dependencies
# Wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm ci --only=production 

# Bundle app source
COPY . .

# Bind port to be mapped by docker daemon 
EXPOSE 3000
# Start app 
CMD [ "npm", "start" ]