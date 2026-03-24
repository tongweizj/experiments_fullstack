const studentTypeDefs = `#graphql
    type Student {
        id: ID!
        studentNumber: String!
        firstName: String
        lastName: String
        address: String
        city: String
        phoneNumber: String
        email: String
        program: String
        favoriteTopic: String
        hobby: String
        courses: [Course]
    }

    type AuthPayload {
        token: String!
        student: Student!
    }

    type Query {
        students: [Student]
        student(id: ID!): Student
        studentByNumber(studentNumber: String!): Student
    }

    type Mutation {
        login(studentNumber: String!, password: String!): AuthPayload

        addStudent(
            studentNumber: String!,
            password: String!,
            firstName: String,
            lastName: String,
            address: String,
            city: String,
            phoneNumber: String,
            email: String,
            program: String,
            favoriteTopic: String,
            hobby: String
        ): Student
        
        updateStudent(
            id: ID!,
            password: String,
            firstName: String,
            lastName: String,
            address: String,
            city: String,
            phoneNumber: String,
            email: String,
            program: String,
            favoriteTopic: String,
            hobby: String,
            courses: [ID]
        ): Student

        deleteStudent(id: ID!): Student
    }
`;

module.exports = studentTypeDefs;
