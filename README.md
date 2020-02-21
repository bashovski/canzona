# canzona
Play, browse and explore World's music in one place - built using MERN stack.

### Requirements

[Node.js - 10.16.0 or newer](https://nodejs.org/en/)<br>
[AWS (S3, SES)](https://aws.amazon.com/)<br>
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Development environment


#### Before running the API, you'll need to create a .env file with content of .env-example file. After doing so, insert secret access tokens and required credentials such as: (MongoDB Atlas keys, AWS tokens, etc.)

```shell
git clone https://github.com/bashovski/canzona
cd canzona

# Running the api
cd api
npm install
nodemon server.js

# Or - running the ui
cd ui
npm install
npm run start
```

### API

#### Initialize a route path

In order to keep the api structure simple, we've decided to store all request method holders in one file and grant them request verbs once needed.
Therefore, inside /api/routes/api.js you may add your new path to a new request method holder for any object you may want to implement a model for.

```js
let routers = [
        'users',
        <your-new-method-holder>, // <-- add a new method holder (e.g. conversations, posts, comments, etc.)
        ...
    ];
```
