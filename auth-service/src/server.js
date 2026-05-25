const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const swaggerSpec = require('./swagger/swaggerConfig');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// REST Routes
app.use('/api/auth', authRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// GraphQL Server
async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Auth Service running on port ${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
        console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
    });
}

startServer();
