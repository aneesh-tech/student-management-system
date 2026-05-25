const Enrollment = require('../models/enrollment');

const resolvers = {
    Query: {
        getEnrollments: async () => await Enrollment.find()
    },
    Mutation: {
        enrollStudent: async (_, args) => await Enrollment.create(args),
        dropEnrollment: async (_, { id }) => {
            await Enrollment.findByIdAndDelete(id);
            return "Enrollment dropped successfully";
        }
    }
};

module.exports = resolvers;
