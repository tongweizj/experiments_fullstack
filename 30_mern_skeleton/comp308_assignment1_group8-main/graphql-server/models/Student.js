const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    studentNumber: {
        type: String,
        unique: true,
        required: 'Student number is required',
        trim: true
    },
    password: {
        type: String,
        validate: [
            (password) => password && password.length > 6,
            'Password should be longer than 6 characters'
        ]
    },
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    phoneNumber: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    program: String,
    favoriteTopic: String,
    hobby: String,
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

StudentSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
    const splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

StudentSchema.pre('save', function() {
    if (this.isModified('password') || this.isNew) {
        if (this.password) {
            this.password = bcrypt.hashSync(this.password, saltRounds);
        }
    }
});

StudentSchema.methods.authenticate = function(password) {
    return bcrypt.compareSync(password, this.password);
};

StudentSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

module.exports = mongoose.model('Student', StudentSchema);
