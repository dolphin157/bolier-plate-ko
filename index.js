const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/key')

const { auth } = require('./middleware/auth')
const { User } = require('./models/User');

const app = express();
const port = 3000;
const cookieParser = require('cookie-parser')

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

mongoose.connect(config.mongoURI,{
}).then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err))

app.get('/', (req,res) => res.send('Hello World!word'))


app.post('/api/users/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
})

app.post('/api/users/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        }

        const isMatch = await new Promise((resolve, reject) => {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(isMatch);
                }
            });
        });

        if (!isMatch) {
            return res.status(400).json({
                loginSuccess: false,
                message: "비밀번호가 틀렸습니다."
            });
        }

        // 비밀번호까지 맞다면 토큰을 생성하기
        await user.generateToken();
        // 토큰 생성이 성공했을 때의 동작
        res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            loginSuccess: false,
            message: "서버 오류가 발생했습니다."
        });
    }
});



app.get('/api/users/auth', auth , (req, res) => {

    //미들웨어 통과해서 여기까지 왔으면 Auth가 Ture라는 뜻
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.user._id }, { token: "" }).exec();
        return res.status(200).send({ success: true });
    } catch (err) {
        return res.json({ success: false, err });
    }
});


app.listen(port, () => console.log(`Example app port ${port}!`))

