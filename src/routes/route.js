const express = require('express')
const users = require('../controllers/usersController.js')
const router = express.Router()

const route = (app) => {
    router.get('/users', users.getAllUsers);

    router.get('/user/:id', users.getUserById);

    router.put('/update-user', users.updateUser);

    router.delete('/delete-user/:id', users.deleteUserById);

    router.post('/create-user', users.createUser);

    return app.use('/api', router)
}

module.exports = route

