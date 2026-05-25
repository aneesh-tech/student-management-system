const Course = require('../models/course');

const resolvers = {
    Query: {
        getCourses: async () => await Course.find(),
        getCourseById: async (_, { id }) => await Course.findById(id)
    },
    Mutation: {
        createCourse: async (_, args) => await Course.create(args),
        updateCourse: async (_, { id, ...args }) => await Course.findByIdAndUpdate(id, args, { new: true }),
        deleteCourse: async (_, { id }) => {
            await Course.findByIdAndDelete(id);
            return "Course deleted successfully";
        }
    }
};

module.exports = resolvers;
