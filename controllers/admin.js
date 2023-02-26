const Admin = require('../models/admin')
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



module.exports = {register}