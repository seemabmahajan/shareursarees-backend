const express = require("express")
const router = express.Router()
const ctrl = require('../controllers')

//Profile

router.get('/profile/:id', ctrl.profile.show)
router.put('/profile/:id', ctrl.profile.updateProfile)


//View Saris

router.get('/saris', ctrl.sari.index)


router.post('/profile/:id/sari', ctrl.sari.createSari)
router.get('/profile/:id/sari', ctrl.sari.showMySaris)

module.exports = router


