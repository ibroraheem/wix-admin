const Admin = require('../models/admin');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// const User = require('../Models/user');
const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        let admin = await Admin.findOne({ email: email });
        if (admin) return res.status(400).json({ message: 'Admin already exists' });
        const hashedPassword = await bcrypt.hash(password, 12);
        const Email = email.toLowerCase();

        admin = new Admin({
            email: Email, password: hashedPassword, firstName, lastName
        })
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })
        res.status(201).json({ message: 'Admin created successfully', email, firstName, lastName, token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);

    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            res.status(404).json({ message: 'Admin not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })
        res.status(200).json({ message: 'Login Success', email: admin.email, firstName: admin.firstName, lastName: admin.lastName, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const admin = await Admin.findOne({ email: email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        const passwordResetToken = Math.floor(Math.random() * 1000000);
        admin.passwordResetToken = passwordResetToken.toString();
        admin.passwordResetExpires = Date.now() + 600;
        await admin.save();
        //Mailer goes here
        res.status(200).json({ message: 'Password reset token generated', passwordResetToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, password, passwordResetToken } = req.body;
        const admin = await Admin.findOne({ email: email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        if (admin.passwordResetExpires < Date.now()) return res.status(400).json({ message: 'Token expired' });
        if (passwordResetToken !== admin.passwordResetToken) return res.status(400).json({ message: 'Invalid password reset token' });
        const hashedPassword = await bcrypt.hash(password, 12);
        admin.password = hashedPassword;
        admin.passwordResetToken = undefined;
        admin.passwordResetExpires = undefined;
        await admin.save();
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        const users = await User.find({});
        res.status(200).json({ users });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const revokeAccess = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.access = false;
        await user.save();
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const grantAccess = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.access = true;
        await user.save();
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.remove();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}
module.exports = { register, login, forgotPassword, resetPassword, getUsers, revokeAccess, grantAccess, deleteUser };