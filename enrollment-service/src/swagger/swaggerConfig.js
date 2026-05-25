const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Enrollment Service API',
            version: '1.0.0',
            description: 'Enrollment Management Service',
        },
        servers: [
            {
                url: 'http://localhost:5004',
            },
            {
                url: 'http://localhost:5000/api/enrollments',
                description: 'Gateway URL'
            }
        ],
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsDoc(swaggerOptions);
