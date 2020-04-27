FROM node:alpine

# Set working directory inside the container
WORKDIR '/app'

# Copy package.json into the container's WORKDIR first so if there are no changes to it npm install won't run
COPY package.json .

# Only runs (in the WORKDIR) if package.json has changed
RUN npm install

# Copy everything from our local directory to the containers WORKDIR
COPY . .

# Executes `npm start` when container is starts up which is defined in package.json to execute `node index.js`
CMD ["npm","start"]