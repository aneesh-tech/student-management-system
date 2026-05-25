const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Enrollment {
    id: ID!
    enrollmentId: String!
    studentId: String!
    courseId: String!
    enrollmentDate: String!
  }

  type Query {
    getEnrollments: [Enrollment]
  }

  type Mutation {
    enrollStudent(enrollmentId: String!, studentId: String!, courseId: String!): Enrollment
    dropEnrollment(id: ID!): String
  }
`;

module.exports = typeDefs;
