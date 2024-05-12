const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        maxlength: 500
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token:{
        type: String
    },
    tokenExp: {
        type: Number
    }
})


userSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        // 비밀번호가 변경되었을 때만 실행
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash; // 해시된 비밀번호로 교체
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainpassword 12313 
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null,isMatch)
    })
}

userSchema.methods.generateToken = async function() {
    try {
        const user = this;
        const token = jwt.sign(user._id.toHexString(), 'secretToken');
        user.token = token;
        await user.save();
        return user;
    } catch (err) {
        throw err;
    }
};

userSchema.statics.findByToken = async function(token) {
    const user = this;
    try {
        const decoded = jwt.verify(token, 'secretToken');
        const foundUser = await user.findOne({ "_id": decoded, "token": token });
        return foundUser;
    } catch (err) {
        throw err;
    }
}


const User = mongoose.model('User',userSchema)

module.exports = {User}