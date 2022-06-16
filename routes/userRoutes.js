const router = require('express').Router()
const controllerUser = require('../controller/userController')

router.post('/registrasi', (req, res) => {
    controllerUser.registrasiUser(req.body)
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

module.exports = router