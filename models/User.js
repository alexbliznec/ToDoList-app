const bcrypt = require('bcryptjs');
const mongoose = require('../libs/mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: `Необходимо ввести имя`
    },
    email: {
        type: String,
        required: `Необходимо указать e-mail`,
        validate: {
            validator(value) {
                return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
            },
            message: `Введите корректный e-mail`
        },
        unique: `Такой e-mail уже зарегистрирован`
    },
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

userSchema.methods.genPasswordHash = async function (password) {
    if (password !== 'undefined' && password.length > 4) {
        this.salt = await bcrypt.genSaltSync(10);
        this.passwordHash = await bcrypt.hashSync(password, this.salt);
    } else {
        throw new Error ('Длинна пароля должна быть более 4 символов');
    }
}

userSchema.methods.comparePassword = async function (password) {
    let res = await bcrypt.compareSync(password, this.passwordHash);
    return res; 
}



module.exports = mongoose.model('User', userSchema);