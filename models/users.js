import mongoose from 'mongoose'
import 'mongoose-type-email'
import bcrypt from 'bcrypt'
import moment from 'moment'
import jwt from 'jsonwebtoken'

let UserSchema = new mongoose.Schema({
    ID:{
        type: Number,
        required: true,
        unique: true,
        default: parseInt(moment(new Date()).format('mmssSSS'))
    },
    email:{
        type: mongoose.SchemaTypes.Email,
        unique: true,
        trim: true,
        required: true,
        lowercase: true
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

User.methods.GenerateJWTToken = function(callback){
    bcrypt.hash(this.password,10,(err, hashed_pw)=>{
        this.password = hashed_pw;
        this.save()
        .then(result => {
            console.log(result);
            callback({status: 'Success',
                    token: jwt.sign({email: this.email, password: this.password},'abc123')
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
        decoded = jwt.verify(token, 'abc123');
        return Promise.resolve(decoded);
    }catch(error){
        return Promise.reject(error);
    }
}

export default mongoose.model('User', UserSchema);