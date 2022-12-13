require('dotenv').config()
const { query } = require('../config/db/connect.js')
const connection = require('../config/db/connect.js')

const PAGE_SIZE = parseInt(process.env.PAGE_SIZE)

// Get data of all users from database
let getAllUsers = (req, res) => {
    let { page, gender, age } = req.query

    if (!page) {
        page = 1
    }

    let skip = (page - 1) * PAGE_SIZE

    //Don't use filter
    if (!gender && !age) {
        let query = 'SELECT * FROM `USERS` LIMIT ' + skip + ', ' + PAGE_SIZE
        connection.query(
            query,
            function(err, results, fields) {
                return res.status(200).json({
                    message: 'ok',
                    data: results
                })
            }
        );
    }

    //Only filter by age
    else if(!gender) {
        let query = 'SELECT * FROM `USERS` WHERE `age` = ' + age + ' LIMIT ' + skip + ', ' + PAGE_SIZE
        connection.query(
            query,
            function(err, results, fields) {
                return res.status(200).json({
                    message: 'ok',
                    data: results
                })
            }
        );
    }

    //Only filter by gender
    else if(!age) {
        let query = 'SELECT * FROM `USERS` WHERE `gender` = \'' + gender +'\' LIMIT ' + skip + ', ' + PAGE_SIZE
        connection.query(
            query,
            function(err, results, fields) {
                return res.status(200).json({
                    message: 'ok',
                    data: results
                })
            }
        );
    }
    
    //Filter by gender and age
    else {   
        let query =  'SELECT * FROM `USERS` WHERE `age` = ' + age +' AND `gender` = \'' + gender +'\' LIMIT ' + skip + ', ' + PAGE_SIZE
        console.log(query)
        connection.query(
            query,
            function(err, results, fields) {
                return res.status(200).json({
                    message: 'ok',
                    data: results
                })
            }
        );
    }    
}

//Get data of a user from database by id
let getUserById = (req, res) => {
    let id = req.params.id
    console.log(id)
    if(!id) {
        return res.status(200).json({
            message: 'missing required param'
        })
    }
    connection.query(
        'SELECT * FROM `USERS` WHERE `id` = ' + id,
        function(err, results, fields) {
            return res.status(200).json({
                message: 'ok',
                data: results
            })
        }
      );
}

//Update data of a user
let updateUser = async (req, res) => {
    let { name, age, gender, address, avatar, id } = req.body;
    if(!name || !age || !gender || !address || !id) {
        return res.status(200).json({
            message: 'missing required param'
        })
    }
    if(!avatar) {
        avatar = null
    }
    await connection.execute(
        'UPDATE `USERS` SET `name` = ?, `age` = ?, `gender` = ?, `address` = ?, `avatar` = ? WHERE `id` = ?',
        [ name, age, gender, address, avatar, id ]
    );
    return res.status(200).json({
        message: 'ok',
    })
}

// Delete data of a user by id
let deleteUserById = async (req, res) => {
    let id = req.params.id
    if(!id) {
        return res.status(200).json({
            message: 'missing required param'
        })
    }
    await connection.execute(
        'DELETE FROM `USERS` WHERE `id` = ?', [id]
    );
    return res.status(200).json({
        message: 'ok',
    })
}

//Create data of a new user
let createUser = async (req, res) => {
    let { name, age, gender, address, avatar } = req.body;
    if(!name || !age || !gender || !address) {
        return res.status(200).json({
            message: 'missing required param'
        })
    }
    if(!avatar) {
        avatar = null
    }
    await connection.execute(
        'INSERT INTO `USERS` (`name`, `age`, `gender`, `address`, `avatar`) VALUES (?, ?, ?, ?, ?)',
        [ name, age, gender, address, avatar ]
      );
    return res.status(200).json({
        message: 'ok',
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUserById,
    createUser
}