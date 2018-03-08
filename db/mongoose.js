// MONGOOSE MONGODB CONNECT
import mongoose from 'mongoose'
mongoose.Promise = global.Promise;

// Init .env
import dotEnv from 'dotenv'
dotEnv.config();

let url = 'mongodb://localhost:' +process.env.MONGOSERVERPORT+'/login_system';

let db = mongoose.connect(url, {}, (err) => {
    if (err) { throw err; } else {
        console.log('Mongodb connected on port:'+ process.env.MONGOSERVERPORT);
    }
});

export default db;