const mongooseToSwagger = require('mongoose-to-swagger');
const typeUserSchema = require('../src/models/TypeUser.js');
const personSchema = require('../src/models/Person.js');
const userSchema = require('../src/models/User.js');
const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0',
    languague: 'pt-BR'
})

const outputFile = './swagger/swagger_output.json';
const endpointFiles = ['./index.js', './src/router.js'];

let doc = {
    info: {
        version: '1.0.0',
        title: 'API Faculdade do Aluno',
        description: 'Documentação da API Faculdade do Aluno'
    },
    servers: [
        {
            url: 'http://localhost:4000',
            description: 'Servidor Localhost'
        },
        {
            url: 'https://area-aluno-app.vercel.app',
            description: 'Produção'
        }
    ],
    consumes: ['application/json'],
    produce: ['application/json'],
    components: {
        schemas: {
            typeUser: mongooseToSwagger(typeUserSchema),
            person: mongooseToSwagger(personSchema),
            user: mongooseToSwagger(userSchema)
        }

    }

}

swaggerAutogen(outputFile,endpointFiles, doc).then(()=>{
    console.log("Documentação do Swagger gerada encontra-se no arquivo em: "+ outputFile);
    if(process.env.NODE_ENV !== 'production'){
        require('../index.js')
    }
})