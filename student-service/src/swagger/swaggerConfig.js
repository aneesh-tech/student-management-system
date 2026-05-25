const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Student Service API',
            version: '1.0.0',
            description: 'Student Management Service',
        },
        servers: [
            {
                url: 'http://localhost:5002',
            },
            {
                url: 'http://localhost:5000/api/students',
                description: 'Gateway URL'
            }
        ],
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsDoc(swaggerOptions);
