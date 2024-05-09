const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/key')

const { User } = require('./models/User');

const app = express();
const port = 3000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(config.mongoURI,{
}).then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err))

app.get('/', (req,res) => res.send('Hello World!word'))


app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        const userInfo = await user.save();
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
})



app.listen(port, () => console.log(`Example app port ${port}!`))

