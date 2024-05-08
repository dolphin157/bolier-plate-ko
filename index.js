const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://handoohyuck:dur951122!@bolierplate.qydq1yp.mongodb.net/?retryWrites=true&w=majority&appName=bolierplate',{
    
}).then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err))

app.get('/', (req,res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app port ${port}!`))

