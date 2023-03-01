const express = require('express')
const router = express.Router()

const { register, login, getDrivers, getDriver, deleteDriver, getUsers, getUser, revokeAccess, grantAccess, deleteUser, getTrips, getTrip, getWithdrawals, getWithdrawal, approveWithdrawal, declineWithdrawal } = require('../controllers/admin')

router.post('/register', register)
router.post('/login', login)
router.get('/drivers', getDrivers)
router.get('/driver/:id', getDriver)
router.delete('/driver/:id', deleteDriver)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.delete('/user/:id', deleteUser)
router.get('/trips', getTrips)
router.get('/trip/:id', getTrip)
router.post('/revoke', revokeAccess)
router.post('/grant', grantAccess)
router.get('/withdrawals', getWithdrawals)
router.get('/withdrawal/:id', getWithdrawal)
router.post('/withdrawal/approve', approveWithdrawal)
router.post('/withdrawal/decline', declineWithdrawal)

module.exports = router
