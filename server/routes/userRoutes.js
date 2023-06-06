const express = require('express')

const router = express.Router()


router.post('/login', (req,res) =>{
    res.json({ message : 'login user'})
})

router.post('/register', (req,res) =>{
    res.json({ message : 'Register user'})
})

router.get('/current', (req, res) =>{
    res.json({ message : 'Currenct user info'})

})

module.exports = router