import mongoose from 'mongoose'
import 'mongoose-type-email'
import bcrypt from 'bcrypt'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import dotEnv from 'dotenv'

dotEnv.config();

let UserSchema = new mongoose.Schema({
    ID:{
        type: Number,
        required: true,
        unique: true,
        default: parseInt(moment(new Date()).format('mmssSSS'))
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    update_timestamp:{
        type: Date,
        default: Date.now()
    }
})

UserSchema.methods.GenerateJWTToken = function(callback){
    bcrypt.hash(this.password,10,(err, hashed_pw)=>{
        this.password = hashed_pw;
        this.save()
        .then(result => {
            console.log(result);
            callback({status: 'Success',
                token: jwt.sign({ email: this.email, password: this.password }, process.env.SECRETKEY)
                    });
        })
        .catch(err => {
           callback({status: 'error',
        ErrorDetails: err});
        });
    })
}

UserSchema.statics.verifyJWTToken = function(token){
    let decoded;
    try{
        decoded = jwt.verify(token, process.env.SECRETKEY);
        return Promise.resolve(decoded);
    }catch(error){
        return Promise.reject(error);
    }
}

let User = mongoose.model('User', UserSchema);
module.exports = User;