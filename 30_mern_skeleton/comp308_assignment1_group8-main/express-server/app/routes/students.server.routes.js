// Load the controllers
const students = require('../controllers/students.server.controller');
const users = require('../../app/controllers/users.server.controller');

// Define the routes module method
module.exports = function (app) {

    app.get('/students/debug-list', function(req, res) {
    const Student = require('mongoose').model('Student');
    Student.find({}, function(err, students) {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        const studentList = students.map(student => ({
            studentNumber: student.studentNumber,
            studentNumberType: typeof student.studentNumber,
            firstName: student.firstName,
            hasPassword: !!student.password
        }));
        console.log('=== ALL STUDENTS ===', studentList);
        res.json({total: students.length, students: studentList});
    });
});

    // List all students (Requires Admin login)
    app.get("/students", users.requiresLogin, students.list); 

    // Create a new student (Requires Admin login)
    app.post('/students/create', users.requiresLogin, students.create);

    // AUTHENTICATION routes MUST come BEFORE parameterized routes
    // Otherwise /students/read_cookie matches /students/:studentId pattern!
    app.post('/students/signin', students.authenticate);
    app.get('/students/signout', students.signout);
    app.get('/students/read_cookie', students.isSignedIn);
    
    // Protected welcome page for students
    app.get('/welcome', students.welcome);

    // Student specific routes - AFTER authentication routes
    app.route('/students/:studentId')
        .get(students.read)
        .put(users.requiresLogin, students.update)
        .delete(users.requiresLogin, students.delete);

    // Set up the 'studentId' parameter middleware
    app.param('studentId', students.studentByID);

    
};