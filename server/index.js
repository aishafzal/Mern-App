const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./models/usermodel')
const jwt = require('jsonwebtoken');

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/full-mern-stack')

app.post('/api/register',async (req,res) => {
    console.log(req.body)
     try{
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }) 
     res.json({ status: 'okay' })
     }
     catch(e)
     {
        res.json({ status: 'error', error: 'Duplicate email', })
     }
})

app.post('/api/login',async (req,res) => {

   const user = await User.findOne({
    email: req.body.email,
    password:req.body.password,
})
if(user) {
    const token = jwt.sign({
        name:user.name,
        email:user.email,


    },'secret123')
  return res.json({ status: 'okay', user:true })
}
    else{
        return res.json({status: 'error', user: 'false'})
    }
})


app.listen(2000, () => {
    console.log('SERVER STARTRED ON 2000');
})