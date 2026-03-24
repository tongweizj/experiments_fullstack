const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    password: {
        type: String,
        validate: [
            (password) => password && password.length > 6,
            'Password should be longer'
        ]
    }
});

UserSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
    const splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function() {
    if (this.isModified('password') || this.isNew) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
});

UserSchema.methods.authenticate = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

module.exports = mongoose.model('User', UserSchema);
