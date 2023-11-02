const userSchema = require('../models/User.js');
const dbConnection = require('../middlewares/dbConnection.js');
const authUser = require('../middlewares/authUser.js')
const treatError = require('../functions/treatError.js');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

router
    .post('/create', dbConnection, async (req, res) => {
        try {
            //#swagger.tags = ['User']

            const { user_email, user_password, person_id } = req.body
            const attempts = 10;
            const passwordHash = await bycrypt.hash(user_password, attempts);

            const dbResponse = await userSchema.create({ user_email, user_password: passwordHash, person_id })

            res.status(200).json({
                status: 'Ok',
                statusMessage: 'Usuer created sucessufully',
                response: dbResponse
            })
        }
        catch (error) {
            return treatError(res, error)
        }
    })
    .post('/login', dbConnection, async (req, res) => {
        try {
            //#swagger.tags = ['User']

            const { email, password } = req.body
            const dbResponse = await userSchema.findOne({ user_email: email }).select("+user_password")

            if (dbResponse && dbResponse.user_status) {
                let correctPassword = await bycrypt.compare(password, dbResponse.user_password);
                if (correctPassword) {
                    let token = jwt.sign({ id: dbResponse.person_id }, process.env.JWT_SECRET, { expiresIn: '1d' })

                    res.header('x-auth-token', token)
                    res.status(200).json({
                        status: 'Ok',
                        statusMessage: 'User autenticate sucessufully',
                        response: { "x-auth-token": token }
                    });

                }
                else {
                    throw new Error("Email ou senha incorreta");
                }
            }
            else {
                throw new Error("Email ou senha incorreta");
            }

        }
        catch (error) {
            return treatError(res, error)
        }
    })

    .put('/update/:id', authUser, dbConnection, async (req, res) => {
        try {
            //#swagger.tags = ['User']
            const { id } = req.params

            if(req.body.user_password){
                const attempts = 10;
                const passwordHash = await bycrypt.hash(req.body.user_password, attempts);
                req.body.user_password = passwordHash;
            }

            const dbResponse = await userSchema.findByIdAndUpdate(id, { $set: req.body })

            res.status(200).json({
                status: 'Ok',
                response: dbResponse
            })
        }
        catch (error) {
            return treatError(res, error)
        }
    })

module.exports = router
