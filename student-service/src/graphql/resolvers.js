const Student = require('../models/student');

const resolvers = {
    Query: {
        getStudents: async () => await Student.find(),
        getStudentById: async (_, { id }) => await Student.findById(id)
    },
    Mutation: {
        createStudent: async (_, args) => {
            return await Student.create(args);
        },
        updateStudent: async (_, { id, ...args }) => {
            return await Student.findByIdAndUpdate(id, args, { new: true });
        },
        deleteStudent: async (_, { id }) => {
            await Student.findByIdAndDelete(id);
            return "Student deleted successfully";
        }
    }
};

module.exports = resolvers;
