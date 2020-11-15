const mongoose = require('mongoose');
const moogoseConnect = () =>{
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(() => console.log('connected to db')).catch(err => console.log('MongoDB error when connecting:' + err));
}


exports.moogoseConnect = moogoseConnect;