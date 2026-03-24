const Student = require('../models/Student');
const Course = require('../models/Course');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const studentResolvers = {
    Query: {
        students: async () => await Student.find({}).populate('courses'),
        student: async (_, { id }) => await Student.findById(id).populate('courses'),
        studentByNumber: async (_, { studentNumber }) => await Student.findOne({ studentNumber }).populate('courses'),
    },
    Mutation: {
        login: async (_, { studentNumber, password }) => {
            const student = await Student.findOne({ studentNumber });
            if (!student) {
                throw new Error('No student found with this student number');
            }

            const valid = await bcrypt.compare(password, student.password);
            if (!valid) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign(
                { id: student._id, studentNumber: student.studentNumber },
                process.env.JWT_SECRET || 'developmentSessionSecret',
                { expiresIn: '1d' }
            );

            return {
                token,
                student
            };
        },
        addStudent: async (_, args) => {
            const newStudent = new Student({
                ...args
            });
            return await newStudent.save();
        },
        updateStudent: async (_, { id, ...args }) => {
            // Get original student
            const student = await Student.findById(id);
            if (!student) throw new Error("Student not found");

            // Update fields manually to trigger pre-save hook if password changed
            Object.assign(student, args);
            
            const updatedStudent = await student.save();
            await updatedStudent.populate('courses');
            
            // Handle bidirectional relationship if courses field was provided
            if (args.courses) {
                // (This part needs careful consideration if we want to keep it simple, 
                // but for now we focus on fixing the password hashing)
                const oldCourses = student.courses.map(c => c.toString());
                const newCourses = args.courses;

                // 1. Remove student from courses that were unassigned
                const removedCourses = oldCourses.filter(c => !newCourses.includes(c));
                if (removedCourses.length > 0) {
                    await Course.updateMany(
                        { _id: { $in: removedCourses } },
                        { $pull: { students: id } }
                    );
                }

                // 2. Add student to courses that were newly assigned
                const addedCourses = newCourses.filter(c => !oldCourses.includes(c));
                if (addedCourses.length > 0) {
                    await Course.updateMany(
                        { _id: { $in: addedCourses } },
                        { $addToSet: { students: id } }
                    );
                }
            }
            
            return updatedStudent;
        },
        deleteStudent: async (_, { id }) => {
            // Optional: Remove student from all courses before deleting
            await Course.updateMany(
                { students: id },
                { $pull: { students: id } }
            );
            return await Student.findByIdAndDelete(id);
        }
    }
};

module.exports = studentResolvers;
