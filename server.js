const express = require('express');
const helmet = require ('helmet')
const logger  = require('morgan')

const userRouter = require('./users/userRouter.js');

const server = express();

//built in middleware
server.use(express.json());


//third party middleware
server.use(helmet());
server.use(logger('dev'))

//custom middleware
server.use(typeLogger)

//router
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function typeLogger(req, res, next) {
  console.log(`${req.method} Request`);
  next(); //tells the api to move to the next method, without this, it wont ever get past this
};

server.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Bad request',
    err
  });
});

module.exports = server;
