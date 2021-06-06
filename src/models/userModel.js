const bcrypt = 'bcrypt'
const {mongoose} = 'mongoose';
const Schema = mongoose.Schema;
const uniqueValidator = 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
    _isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    _isAccountVerified: {
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
            validator: function (email) {
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
    birthdate: {
        type: Date,
        //TODO: faire la validation du format Date
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
    bio: {
        type: String,
        trim: true,
    },
    profile_image_url: {
        type: Schema.Types.ObjectId,
        ref: 'Picture'
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Like',
        },
    ],
    post:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Follow',
        },
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Follow',
        },
    ],
},{
    timestamps: true,
});
userSchema.plugin(uniqueValidator, {message: 'is already taken'});

userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 12);
});

const user = mongoose.model('User', userSchema);

module.exports =  user;