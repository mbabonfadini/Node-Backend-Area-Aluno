function routes(app){
    app.use('/typeOfUser', require('./routes/typeUser.js'));
    app.use('/people', require('./routes/person.js'));
    app.use('/user', require('./routes/user.js'))

    return
}

module.exports = routes