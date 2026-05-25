const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Student {
    id: ID!
    studentId: String!
    name: String!
    email: String!
    department: String!
    semester: Int!
    phone: String!
  }

  type Query {
    getStudents: [Student]
    getStudentById(id: ID!): Student
  }

  type Mutation {
    createStudent(
      studentId: String!,
      name: String!,
      email: String!,
      department: String!,
      semester: Int!,
      phone: String!
    ): Student

    updateStudent(
      id: ID!,
      name: String,
      email: String,
      department: String,
      semester: Int,
      phone: String
    ): Student

    deleteStudent(id: ID!): String
  }
`;

module.exports = typeDefs;
