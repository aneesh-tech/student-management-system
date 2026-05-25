const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Course {
    id: ID!
    courseId: String!
    courseName: String!
    credits: Int!
    faculty: String!
  }

  type Query {
    getCourses: [Course]
    getCourseById(id: ID!): Course
  }

  type Mutation {
    createCourse(courseId: String!, courseName: String!, credits: Int!, faculty: String!): Course
    updateCourse(id: ID!, courseName: String, credits: Int, faculty: String): Course
    deleteCourse(id: ID!): String
  }
`;

module.exports = typeDefs;
