const Course = require('../models/Course');
const Student = require('../models/Student');

const courseResolvers = {
    Query: {
        courses: async () => await Course.find({}).populate('students'),
        course: async (_, { id }) => await Course.findById(id).populate('students'),
        courseByCode: async (_, { courseCode }) => await Course.findOne({ courseCode }).populate('students'),
        coursesByStudent: async (_, { studentNumber }) => {
            const student = await Student.findOne({ studentNumber });
            if (!student) return [];
            return await Course.find({ students: student._id }).populate('students');
        },
    },
    Mutation: {
        addCourse: async (_, { studentNumber, ...args }, context) => {
            // 檢查是否已登入
            if (!context.user) {
                throw new Error('You must be logged in to add a course');
            }

            // 如果有提供 studentNumber 則使用之，否則使用登入者的 studentNumber
            const targetStudentNumber = studentNumber || context.user.studentNumber;
            const student = await Student.findOne({ studentNumber: targetStudentNumber });
            
            const courseData = { ...args };
            if (student) {
                courseData.students = [student._id];
            }
            const newCourse = new Course(courseData);
            const savedCourse = await newCourse.save();
            
            // 同步更新學生的課程列表
            if (student) {
                await Student.findByIdAndUpdate(
                    student._id,
                    { $push: { courses: savedCourse._id } }
                );
            }
            
            return savedCourse;
        },
        updateCourse: async (_, { id, studentNumber, ...args }) => {
            if (studentNumber) {
                const student = await Student.findOne({ studentNumber });
                if (student) {
                    return await Course.findByIdAndUpdate(
                        id, 
                        { ...args, $addToSet: { students: student._id } }, 
                        { new: true }
                    ).populate('students');
                }
            }
            return await Course.findByIdAndUpdate(id, args, { new: true }).populate('students');
        },
        deleteCourse: async (_, { id }) => {
            return await Course.findByIdAndDelete(id);
        },
        registerCourse: async (_, { courseId, studentNumber }) => {
            const student = await Student.findOne({ studentNumber });
            if (!student) throw new Error('Student not found');
            
            const course = await Course.findByIdAndUpdate(
                courseId,
                { $addToSet: { students: student._id } },
                { new: true }
            ).populate('students');

            await Student.findByIdAndUpdate(
                student._id,
                { $addToSet: { courses: courseId } }
            );

            return course;
        },
        dropCourse: async (_, { courseId, studentNumber }) => {
            const student = await Student.findOne({ studentNumber });
            if (!student) throw new Error('Student not found');

            const course = await Course.findByIdAndUpdate(
                courseId,
                { $pull: { students: student._id } },
                { new: true }
            ).populate('students');

            await Student.findByIdAndUpdate(
                student._id,
                { $pull: { courses: courseId } }
            );

            return course;
        }
    }
};

module.exports = courseResolvers;
