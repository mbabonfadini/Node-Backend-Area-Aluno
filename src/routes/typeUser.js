const typeUserSchema = require('../models/TypeUser.js');
const treatError = require('../functions/treatError.js')
const dbConnection = require('../middlewares/dbConnection.js');
const router = require('express').Router();

router
    .post('/create', dbConnection, async (req, res) => {
        try {

            //#swagger.tags = ['Type Of User']
            const { type_user, type_user_description } = req.body;
            const dbResponse = await typeUserSchema.create({ type_user, type_user_description })
            res.status(200).json({
                status: 'Ok',
                response: dbResponse,
            })
        }
        catch (error) {
            return treatError(res, error)
        }
    })
    .get('/read', dbConnection, async (req, res) => {
        try {
            //#swagger.tags = ['Type Of User']
            const dbResponse = await typeUserSchema.find();
            res.status(200).json(
                {
                    status: 'Ok',
                    response: dbResponse,
                }
            )
        }
        catch (error) {
            return treatError(res, error)
        }
    })
    .get('/read/:id', async (req, res) => {
        try {
            //#swagger.tags = ['Type Of User']
            const { id } = req.params
            const dbResponse = await typeUserSchema.findById();
            res.status(200).json(
                {
                    status: 'Ok',
                    response: dbResponse,
                }
            )
        }
        catch (error) {
            return treatError(res, error)
        }
    })
    .put('/update/:id', async (req, res) => {
        try {
            //#swagger.tags = ['Type Of User']
            const { id } = req.params

            const dbResponse = await typeUserSchema.findByIdAndUpdate(id, { Set: req.body });

            res.status(200).json(
                {
                    status: 'Ok',
                    response: dbResponse,
                }
            )
        }
        catch (error) {
            return treatError(res, error)
        }
    })
    .delete('/delete/:id', async (req, res) => {
        try {
            //#swagger.tags = ['Type Of User']
            const { id } = req.params
            const dbResponse = await typeUserSchema.findByIdAndDelete(id);
            res.status(200).json(
                {
                    status: 'Ok',
                    response: 'Deleted Sucessufully',
                }
            )
        }
        catch (error) {
            return treatError(res, error)
        }
    })

module.exports = router;