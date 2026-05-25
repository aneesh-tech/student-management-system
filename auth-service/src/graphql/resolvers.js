const User = require('../models/user');

const resolvers = {
    Query: {
        getUsers: async () => await User.find()
    }
};

module.exports = resolvers;
