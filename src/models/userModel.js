import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    _isActive:{
        type: Boolean,
        required: true,
        default: true,
    },
    _isAccountVerified:{
        type: Boolean,
        required: true,
        default: false,
    },
    pseudo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [3, 'pseudo is too short'],

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(email) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            },
            message: props => `${props.value} is not a valid email format`
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    birthdate:{
        type: Date,
        //TODO: faire la validation du format Date
    },
    create_at:{
        type: Date,
        default: Date.now()
    },
    bio:{
        type: String,
        trim: true,
    },
   posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
        },
    ],
    dateUpdate: {
        type: Date,
        default: Date.now()
    }

});
userSchema.plugin(uniqueValidator,{message:'is already taken'});

userSchema.pre('save', function() {
    const hashedPassword = bcrypt.hashSync(this.password, 12);
    this.password = hashedPassword;
});

const user = mongoose.model('user', userSchema);

export default user;
