const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema(
    {
        user_email: {
            type: String,
            required: 'É obrigatório',
            index: true,
            unique: true,
            lowercase: true,
            validate: {
                validator:
                    (valueTyped) => {
                        return validator.isEmail(valueTyped)
                    },
                message: 'invalido'
            }
        },
        user_password: {
            type: String,
            required: true,
            select: false
        },
        person_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Person',
            required: 'É obrigatório'
        },
        user_status:{
            type: Boolean,
            required: 'É obrigatório',
            default: true
        }

    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        versionKey: false,
    }
);

const userSchema = mongoose.model.User || mongoose.model('User', schema);

module.exports = userSchema;