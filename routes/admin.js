const express = require('express')
const router = express.Router()

const { register, login, getDrivers, getDriver, deleteDriver } = require('../controllers/admin')

router.post('/register', register)
router.post('/login', login)
router.get('/drivers', getDrivers)
router.get('/driver/:id', getDriver)
router.delete('/driver/:id', deleteDriver)

// router.post('/forgot-password', forgotPassword)
// router.post('/reset-password', resetPassword)
// router.get('/users', getUsers)
// router.patch('/revoke-access/:id', revokeAccess)
// router.patch('/grant-access/:id', grantAccess)
// router.delete('/delete-user/:id', deleteUser)

module.exports = router
