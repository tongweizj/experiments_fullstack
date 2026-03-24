const courseTypeDefs = `#graphql
    type Course {
        id: ID!
        courseCode: String!
        courseName: String!
        section: String
        semester: String
        students: [Student]
    }

    extend type Query {
        courses: [Course]
        course(id: ID!): Course
        courseByCode(courseCode: String!): Course
        coursesByStudent(studentNumber: String!): [Course]
    }

    extend type Mutation {
        addCourse(
            courseCode: String!,
            courseName: String!,
            section: String,
            semester: String,
            studentNumber: String
        ): Course

        updateCourse(
            id: ID!,
            courseCode: String,
            courseName: String,
            section: String,
            semester: String,
            studentNumber: String
        ): Course

        deleteCourse(id: ID!): Course

        registerCourse(courseId: ID!, studentNumber: String!): Course
        dropCourse(courseId: ID!, studentNumber: String!): Course
    }
`;

module.exports = courseTypeDefs;
