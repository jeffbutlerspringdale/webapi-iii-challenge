const express = 'express';

const router = express.Router();
const Posts = require('../posts/postDb.js')

server.use('/api/posts', postRouter);

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;