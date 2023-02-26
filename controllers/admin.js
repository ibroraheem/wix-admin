const Admin = require('../models/admin')
const Driver = require('../models/driver')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const register = async (req, res) => {
    try {
        const { email, password, lastName, firstName } = req.body
        const admin = await Admin.findOne({ email: email })
        if (admin) {
            res.status(400).send("Admin already exists")
        } else {
            const hashedPassword = await bcrypt.hash(password, 12)
            const newAdmin = await Admin.create({ email, password: hashedPassword, firstName: firstName, lastName: lastName })
            const token = jwt.sign({ email: newAdmin.email }, process.env.JWT_SECRET, { expiresIn: '5y' })
            res.status(201).send({email: newAdmin.email, token: token})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await Admin.findOne({ email: email })
        if (!admin) {
            res.status(404).send("Admin not found")
        } else {
            const isMatch = await bcrypt.compare(password, admin.password)
            if (!isMatch) {
                res.status(400).send("Incorrect password")
            } else {
                const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '5y' })
                res.status(200).send({email: admin.email, token: token})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

const getDrivers = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findOne({ email: decoded.email })
        if (!admin) {
            res.status(404).send("Admin not found")
        }
        const drivers = await Driver.find()
        res.status(200).send(drivers)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

const getDriver = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findOne({ email: decoded.email })
        if (!admin) {
            res.status(404).send("Admin not found")
        }
        const driver = await Driver.findOne({ _id: req.params.id })
        res.status(200).send(driver)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

const deleteDriver = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findOne({ email: decoded.email })
        if (!admin) {
            res.status(404).send("Admin not found")
        }
        const driver = await Driver.findOne({ _id: req.params.id })
        if (!driver) {
            res.status(404).send("Driver not found")
        }
        await Driver.deleteOne({ _id: req.params.id })
        res.status(200).send("Driver deleted")
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}





module.exports = {register, login, getDrivers, getDriver, deleteDriver}