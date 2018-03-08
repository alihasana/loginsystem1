// Basic imports
import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import dotEnv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import db from './db/mongoose'
import User from './models/users'

// Init .env
dotEnv.config();

// APP INIT
let app = express();


// CORS
app.use(function (req, res, next) {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
});

// BODY PARSER
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/user/create',(req,res)=>{
    let users = new User(req.body);
    users.GenerateJWTToken((result)=>{
        if(result.status == 'Success'){
            res.json(result);
        }else{
            res.status(400).send(result.ErrorDetails);
        }
    })
    
    //res.status(200).send('all ok');
})

app.get('/user',(req,res)=>{
    User.verifyJWTToken(req.header('X-Auth'))
    .then(result =>{
        return User.find({});
    })
    .then(result => res.status(200).send(result))
    .catch(err => res.status(400).send(err))
    });

app.get('/user/message', (req, res) => {
    User.verifyJWTToken(req.header('X-Auth'))
        .then(decodedToken => {
            console.log('decodedToken')
            User.findOne({ "email": decodedToken.email }, { message: 1 }, function(err, usersMessages) {
                console.log('here is messqge', usersMessages);
            });
            
        })

        .then (result => res.status(200).json({success: true, content: result}))
        .catch(err => res.status(400).send(err));
});

app.get('/user/:id',(req,res)=>{
    User.verifyJWTToken(req.header('X-Auth'))
    .then(result =>{
        return User.findOne({"ID":req.params.id});
    })
    
    .then(result => res.status(200).send(result))
    .catch(err => res.status(400).send(err));
});




let port = process.env.PORT || 8080;
app.listen(port, () => console.log('App listen on port: ' + port));