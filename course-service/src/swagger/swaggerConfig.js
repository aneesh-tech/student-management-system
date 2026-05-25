const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Course Service API',
            version: '1.0.0',
            description: 'Course Management Service',
        },
        servers: [
            {
                url: 'http://localhost:5003',
            },
            {
                url: 'http://localhost:5000/api/courses',
                description: 'Gateway URL'
            }
        ],
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsDoc(swaggerOptions);
