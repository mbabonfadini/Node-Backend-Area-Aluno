const Person = require('../models/Person.js');
const dbConnection = require('../middlewares/dbConnection.js');
const treatError = require('../functions/treatError.js');
const router = require('express').Router();


router
    .post('/create', dbConnection, async (req, res) => {
        try {
            //#swagger.tags = ['Person']

            const { person_name, person_last_name, person_birth, person_type } = req.body
            const dbResponse = await Person.create({ person_name, person_last_name, person_birth, person_type })

            res.status(200).json({
                status: 'Ok',
                response: dbResponse
            })
        }
        catch (error) {
            return treatError(res, error)
        }
    })
    .get('/read', dbConnection, async (req, res) => {
        try {
            //#swagger.tags = ['Person']

            const dbResponse = await Person.find()

            res.status(200).json({
                status: 'Ok',
                response: dbResponse
            })
        }
        catch (error) {
            return treatError(res, error)
        }
    })
    .get('/read/:id', dbConnection, async (req, res) => {
        try {
            //#swagger.tags = ['Person']


            const { id } = req.params
            const dbResponse = await Person.findById(id)

            res.status(200).json({
                status: 'Ok',
                response: dbResponse
            })
        }
        catch (error) {
            return treatError(res, error)
        }
    })
    .put('/update/:id', dbConnection, async (req, res) => {
        try {
            //#swagger.tags = ['Person']
            const { id } = req.params;

            const dbResponse = await Person.findByIdAndUpdate(id, { $set: req.body });

            res.status(200).json({
                status: 'Ok',
                response: 'Updated sucessufuly'
            })
        }
        catch (error) {
            return treatError(res, error)
        }
    })
    .delete('/delete/:id', dbConnection, async (req, res) => {
        try {
            //#swagger.tags = ['Person']
            const { id } = req.params;

            const dbResponse = await Person.findByIdAndDelete(id);

            res.status(200).json({
                status: 'Ok',
                response: 'Deleted sucessufuly'
            })
        }
        catch (error) {
            return treatError(res, error)
        }
    })

module.exports = router