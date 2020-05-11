const express = require("express")
const router = express.Router()
const ctrl = require('../controllers')

//Profile

router.get('/profile/:id', ctrl.profile.show)
router.put('/profile/:id', ctrl.profile.updateProfile)

router.post('/myshop/:id/sari', ctrl.sari.createSari)


//View Saris

router.get('/saris', ctrl.sari.index)


//router.post('/myshop/:id/sari', ctrl.sari.createSari)
router.get('/myshop/:id', ctrl.sari.showMySaris)

router.delete('/user/:userId/saris/:sariId',ctrl.sari.deleteSari)

router.put('/user/:userId/saris/:sariId',ctrl.sari.updateSari)

module.exports = router


