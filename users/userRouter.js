const express = require('express');

const Users = require('./userDb.js')
const Posts = require('../posts/postDb.js')

const router = express.Router();

router.use((req, res, next) => {
    console.log('Users router');
    next();
  })

router.post('/', (req, res) => {
    Users.insert(req.body)
    .then(users => {
      res.status(201).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding user',
      });
    });
});

router.post('/:id/posts', validateUserId, (req, res) => {
    //have to send a user_id
    Posts.insert(req.body)
    .then(posts => {
      res.status(201).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding Post',
      });
    });
});

router.get('/', (req, res) => {
    Users.get(req)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Users',
      });
    });
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {
    Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Posts',
      });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
    Users.remove(req.params.id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error Deleting the User',
      });
    });
});

router.put('/:id', validateUserId, (req, res) => {
    Users.update(req.params.id, req.body)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error Updating the User',
      });
    });
});

//custom middleware

async function validateUserId(req, res, next) {
    try {
        const { id } = req.params;
        const user = await Users.getById(id);
        if (user) {
          req.user = user;
          next();
        } else {
          next({message: 'user not found; invalid ID'})
        }
      } catch (err) {
        res.satus(404).json({message: 'Failed to process request'})
      }
};

function validateUser(req, res, next) {
    try {
        if (req.body && Object.keys(req.body).length) {
          next();
        } else {
          next(res.satus(404).json({message: 'message: "missing user data'}))
        }
      } catch (err) {
        res.satus(404).json({message: 'Failed to process request'})
      }
};

function validatePost(req, res, next) {
    try {
        if (req.body && Object.keys(req.body).length) {
          next();
        } else {
          next(res.satus(404).json({message: 'message: "missing user data'}))
        }
      } catch (err) {
        res.satus(404).json({message: 'Failed to process request'})
      }
};

module.exports = router;
