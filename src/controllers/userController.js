require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const user = require('../model/user.js')


//Get all the data of the users from the database
let getAllUsers = async(req, res) => {
    let { page, pagesize, name, age, gender, address } = req.query

    pagesize = parseInt(pagesize)
    if (!pagesize) {
        pagesize = 10
    }

    if (pagesize > 100) {
        pagesize = 100
    }

    if (!page) {
        page = 1
    }
    try {
        let count = await user.count()
        if (page > ( count - 1 )/ pagesize + 1) {
            page = parseInt(( count - 1 )/ pagesize + 1)
        }
    } catch(err) {
        console.log('Cannot count. Error: ', err)
        return res.status(500).json({
            message: 'server error',
        })
    }

    let skip = (page - 1) * pagesize
    
    //Structure data need to find
    let find = new Object();
    if(name) {
        find.name = {
            [Op.substring] : name
        }
    }
    if(age) {
        find.age = age
    }
    if(gender) {
        find.gender = gender
    }
    if(address) {
        find.address = {
            [Op.substring] : address
        }
    }

    //
    try {
        let data = await user.findAll({
            where: find,
            offset: skip,
            limit: pagesize
        })

        return res.status(200).json({
            message: 'ok',
            data: data
        })
    } catch (err) {
        console.log('Cannot get data. Error:', err)
        return res.status(500).json({
            message: 'server error',
        })
    }
}


//Get the data of a user from database by id
let getUserById = async(req, res) => {
    let id = req.query.id
    try {
        let count = await user.count()
        if (id > count || id <= 0) {
            return res.status(404).json({
                message: 'data not found',
            })
        }
    } catch(err) {
        console.log('Cannot count. Error: ', err)
        return res.status(500).json({
            message: 'server error',
        })
    }
    if(!id) {
        return res.status(400).json({
            message: 'missing required param'
        })
    }
    try {
        let data = await user.findByPk(id)
        return res.status(200).json({
            message: 'ok',
            data: data
        })
    } catch (err) {
        console.log('Cannot get data. Error:', err)
        return res.status(500).json({
            message: 'server error',
        })
    }
}

//Update the data of a user
let updateUser = async (req, res) => {
    let { name, age, gender, address, avatar, id } = req.body;
    if(!id) {
        return res.status(400).json({
            message: 'missing required param'
        })
    }
    try {
        let count = await user.count()
        if (id > count || id <= 0) {
            return res.status(404).json({
                message: 'data not found',
            })
        }
    } catch(err) {
        console.log('Cannot count. Error: ', err)
        return res.status(500).json({
            message: 'server error',
        })
    }
    try {
        let data = await user.findByPk(id)
        if(name) {
            data.name = name
        }
        if(age) {
            data.age = age
        }
        if(gender) {
            data.gender = gender
        }
        if(address) {
            data.address = address
        }
        if(avatar || avatar === '') {
            data.avatar = avatar
        }
        await data.save()
        return res.status(200).json({
            message: 'ok',
            data: data
        })
    } catch (err) {
        console.log('Cannot update data. Error:', err)
        return res.status(500).json({
            message: 'server error',
        })
    }
}

// Delete the data of a user by id
let deleteUserById = async (req, res) => {
    let id = req.query.id
    try {
        let count = await user.count()
        if (id > count || id <= 0) {
            return res.status(404).json({
                message: 'data not found',
            })
        }
    } catch(err) {
        console.log('Cannot count. Error: ', err)
        return res.status(500).json({
            message: 'server error',
        })
    }
    if(!id) {
        return res.status(400).json({
            message: 'missing required param'
        })
    }
    try {
        let data = await user.findByPk(id)
        await data.destroy()
        return res.status(200).json({
            message: 'ok'
        })
    } catch (err) {
        console.log('Cannot delete data. Error:', err)
        return res.status(500).json({
            message: 'server error',
        })
    }
} 

//Create the data of a new user
let createUser = async (req, res) => {
    let { name, age, gender, address, avatar } = req.body;
    if(!name || !age || !gender || !address) {
        return res.status(400).json({
            message: 'missing required param'
        })
    }
    try {
        let data = await user.create({
            name: name,
            age: age,
            gender: gender,
            address: address,
            avatar: avatar
        })
        return res.status(200).json({
            message: 'ok',
            data: data
        })
    } catch (err) {
        console.log('Cannot create data. Error:', err)
        return res.status(500).json({
            message: 'server error',
        })
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUserById,
    createUser
}