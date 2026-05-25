const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth Service API',
            version: '1.0.0',
            description: 'Authentication Service for Student Management System',
        },
        servers: [
            {
                url: 'http://localhost:5001',
            },
            {
                url: 'http://localhost:5000/api/auth',
                description: 'Gateway URL'
            }
        ],
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsDoc(swaggerOptions);
