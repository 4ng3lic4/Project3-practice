client

npm install -g yarn

create the folder structure

yarn create react-app client

add proxy to package.json

.env file
# LINE_BELOW_SHOULD_ONLY_BE_FOR_DEV
DANGEROUSLY_DISABLE_HOST_CHECK=true

yarn add @apollo/client graphql jwt-decode react-router-dom

copy in src

update index.js

cd ../server

yarn add @apollo/server bcrypt cors cross-env dotenv express graphql graphql-tag jsonwebtoken mongoose

yarn add jest nodemon --dev


## Scripts Explanation

used for Continuous Integration processes
"test": "cd client && cross-env CI=true npx react-scripts test --env=jsdom && cd ../server && cross-env NODE_ENV=test npx jest",

used for developing the client (frontend test mode)
"test:client": "cd client && yarn test",

used for developing the backend (backend test mode)
"test:server": "cd server && yarn test",

used only for deployment (you need this for heroku)
"start": "cross-env NODE_ENV=production node server/server.js --ignore client",

used only for development (this would be the defacto standard for starting your application on your computer)
"develop": "concurrently \"cd server && yarn run develop\" \"cd client && yarn start\"",

used to install both sides of the app using yarn
"install": "cd server && yarn install && cd ../client && yarn install",

used to install the seed data
"seed": "cd server && yarn run seed",

used only for deployment (you need this for heroku)
"build": "cd client && cross-env NODE_ENV=production yarn build"