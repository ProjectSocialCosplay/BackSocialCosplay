const mongoose = require('mongoose');
const moogoseConnect = () =>{
    if(process.env.DB_TEST_HOST == 'localhost'){
        process.env.DB_URL = 'mongodb://'+process.env.DB_TEST_HOST+':'+process.env.DB_PORT+'/social_cosplayer_test'

    }
    console.log(process.env.DB_URL)
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then((res) => {
        if (process.env.NODE_ENV !== 'test') {
            console.log('connected to db')
        }
    }).catch(err => console.log('MongoDB error when connecting: ' + err));
}
exports.moogoseConnect = moogoseConnect;