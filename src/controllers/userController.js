require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const user = require('../model/user.js')

const PAGE_SIZE = parseInt(process.env.PAGE_SIZE)

//Get all the data of the users from the database
let getAllUsers = async(req, res) => {
    let { page, name, age, gender, address } = req.query
    if (!page) {
        page = 1
    }

    let skip = (page - 1) * PAGE_SIZE
    
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

    try {
        let data = await user.findAll({
            where: find,
            offset: skip,
            limit: PAGE_SIZE
        })

        return res.status(200).json({
            message: 'ok',
            data: data
        })
    } catch (err) {
        console.log(err)
    }

    
}


//Get the data of a user from database by id
let getUserById = async(req, res) => {
    let id = req.params.id
    if(!id) {
        return res.status(200).json({
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
        console.log(err)
    }
}

//Update the data of a user
let updateUser = async (req, res) => {
    let { name, age, gender, address, avatar, id } = req.body;
    if(!id) {
        return res.status(200).json({
            message: 'missing required param'
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
        console.log(err)
    }
}

// Delete the data of a user by id
let deleteUserById = async (req, res) => {
    let id = req.params.id
    if(!id) {
        return res.status(200).json({
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
        console.log(err)
    }
} 

//Create the data of a new user
let createUser = async (req, res) => {
    let { name, age, gender, address, avatar } = req.body;
    if(!name || !age || !gender || !address) {
        return res.status(200).json({
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
        console.log(err)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUserById,
    createUser
}