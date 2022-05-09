const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    lastName: {
        type: String,
        required: [true, 'The last name is required']
    },
    document_number: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique : true
    },
    username: {
        type: String,
        unique : true
    },
    password: {
        type: String,
    },
    rol: { 
        type: String,
        enum: ['ADMIN', 'GUEST'],
        default: 'GUEST'
    },
    state: {
        type: Boolean,
        default: true
    },
});

userSchema.methods.toJSON = function(){
    const {password, ...data} = this.toObject();
    return data;
}

module.exports = model('User', userSchema);