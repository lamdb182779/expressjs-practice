const express = require('express')
const users = require('../controllers/userController.js')
const router = express.Router()

const route = (app) => {
    router.get('/users', users.getAllUsers);

    router.get('/user', users.getUserById);

    router.put('/update-user', users.updateUser);

    router.delete('/delete-user', users.deleteUserById);

    router.post('/create-user', users.createUser);

    return app.use('/api', router)
}

module.exports = route

