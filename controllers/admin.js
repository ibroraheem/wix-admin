const Admin = require('../models/admin')
const Driver = require('../models/driver')
const User = require('../models/user')
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

const getUsers = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findOne({ email: decoded.email })
        if (!admin) {
            res.status(404).send("Admin not found")
        } else {
            const users = await User.find()
            res.status(200).send(users)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

const getUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findOne({ email: decoded.email })
        if (!admin) {
            res.status(404).send("Admin not found")
        } else {
            const user = await User.findOne({ _id: req.params.id })
            res.status(200).send(user)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }

}

const revokeAccess = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findOne({ email: decoded.email })
        if (!admin) {
            res.status(404).send("Admin not found")
        } else {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                res.status(404).send("User not found")
            } else {
                user.access = false
                await user.save()
                res.status(200).send("Access revoked")
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

const grantAccess = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findOne({ email: decoded.email })
        if (!admin) {
            res.status(404).send("Admin not found")
        } else {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                res.status(404).send("User not found")
            } else {
                user.access = true
                await user.save()
                res.status(200).send("Access granted")
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

const deleteUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findOne({ email: decoded.email })
        if (!admin) {
            res.status(404).send("Admin not found")
        } else {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                res.status(404).send("User not found")
            } else {
                await User.deleteOne({ _id: req.params.id })
                res.status(200).send("User deleted")
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

const getTrips = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findOne({ email: decoded.email })
        if (!admin) {
            res.status(404).send("Admin not found")
        } else {
            const trips = await Trip.find()
            res.status(200).send(trips)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

const getTrip = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findOne({ email: decoded.email })
        if (!admin) {
            res.status(404).send("Admin not found")
        } else {
            const trip = await Trip.findOne({ _id: req.params.id })
            res.status(200).send(trip)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}


module.exports = {register, login, getDrivers, getDriver, deleteDriver, getUsers, getUser, revokeAccess, grantAccess, deleteUser, getTrips, getTrip}