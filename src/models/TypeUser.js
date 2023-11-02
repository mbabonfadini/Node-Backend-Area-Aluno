const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    type_user: {
        type: String,
        lowercase: true,
        unique: true,
        index: true,
        required: 'É obrigatório',
    },
    type_user_description: {
        type: String,
        lowercase: true,
        required: 'É obrigatório'
    },


},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false,
}
);

const typeUserSchema = mongoose.model.TypeUser || mongoose.model('TypeUser',schema);

module.exports = typeUserSchema;