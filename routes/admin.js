const express = require('express')
const router = express.Router()

const { register, login, forgotPassword, resetPassword, revokeAccess, grantAccess, deleteUser, getUsers } = require('../controllers/admin')

router.post('/register', register)
// router.post('/login', login)
// router.post('/forgot-password', forgotPassword)
// router.post('/reset-password', resetPassword)
// router.get('/users', getUsers)
// router.patch('/revoke-access/:id', revokeAccess)
// router.patch('/grant-access/:id', grantAccess)
// router.delete('/delete-user/:id', deleteUser)

module.exports = router
