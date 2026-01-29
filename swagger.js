const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Cars API',
    description: 'Cars API from project 2 for CSE-341 - Web Services'
  },
  host: 'localhost:3001',
  schemes: ['http','https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);