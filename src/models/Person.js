const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        person_name: {
            type: String,
            required: 'É obrigatório',
            lowercase: true,
        },
        person_last_name: {
            type: String,
            required: 'É obrigatório',
            lowercase: true,
        },
        person_birth:
        {
            type: Date,
            required: 'É obrigatório'
        },
        person_type:
        {
            type: mongoose.Types.ObjectId,
            ref: 'TypeUser',
            required: 'É obrigatório'
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

const personSchema = mongoose.model.Person || mongoose.model('Person', schema);

module.exports = personSchema;