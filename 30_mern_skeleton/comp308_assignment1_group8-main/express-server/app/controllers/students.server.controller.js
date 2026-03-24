// Load the module dependencies
const Student = require('mongoose').model('Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

// Create a new error handling controller method
const getErrorMessage = function(err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Student number already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (const errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};

// Create a new student
exports.create = function (req, res, next) {
    var student = new Student(req.body);
    student.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(student);
        }
    });
};

// Returns all students with populated courses
exports.list = function (req, res, next) {
    Student.find({}).populate('courses').exec(function (err, students) {
        if (err) {
            return next(err);
        } else {
            res.json(students);
        }
    });
};

// 'read' controller method to display a student
exports.read = function(req, res) {
    res.json(req.student);
};

// 'studentByID' controller method to find a student by its id with populated courses
exports.studentByID = function (req, res, next, id) {
    Student.findOne({
        _id: id
    }).populate('courses').exec((err, student) => {
        if (err) {
            return next(err);
        } else {
            req.student = student;
            next();
        }
    });
};

// FIXED: Update a student by id with proper course population and synchronization
exports.update = function(req, res, next) {
    const studentId = req.student.id;
    // Get existing courses to compare with new ones
    const oldCourses = req.student.courses.map(c => c._id ? c._id.toString() : c.toString());
    const newCourses = req.body.courses || [];
    
    Student.findByIdAndUpdate(studentId, req.body, {new: true}, async function (err, student) {
      if (err) {
        return next(err);
      }

      try {
        const Course = require('mongoose').model('Course');
        
        // Find courses that were added
        const added = newCourses.filter(x => !oldCourses.includes(x));
        if (added.length > 0) {
            await Course.updateMany(
                { _id: { $in: added } },
                { $addToSet: { students: studentId } }
            );
        }

        // Find courses that were removed
        const removed = oldCourses.filter(x => !newCourses.includes(x));
        if (removed.length > 0) {
            await Course.updateMany(
                { _id: { $in: removed } },
                { $pull: { students: studentId } }
            );
        }

        // Populate courses in the returned student
        Student.populate(student, {path: 'courses'}, function(err, populatedStudent) {
            if (err) {
                return next(err);
            }
            res.json(populatedStudent);
        });
      } catch (error) {
          console.error('Error synchronizing courses:', error);
          return next(error);
      }
    });
};

// Delete a student by id
exports.delete = function(req, res, next) {
    Student.findByIdAndRemove(req.student.id, function (err, student) {
      if (err) return next(err);
      res.json(student);
    });
};

// Authenticates a student
exports.authenticate = function(req, res, next) {
    const studentNumber = req.body.auth.username; // Keep 'username' key from frontend but map to studentNumber
    const password = req.body.auth.password;

    console.log('=== STUDENT AUTH DEBUG ===');
    console.log('Searching for student number:', studentNumber);
    console.log('Password provided:', password ? 'YES' : 'NO');
    console.log('Student number type:', typeof studentNumber);

    Student.findOne({studentNumber: studentNumber}, (err, student) => {
        if (err) {
            console.error('====Database error during student auth:', err);
            return next(err);
        } else {
            if(student) {
                console.log('====Student found:', student.studentNumber);
                console.log('====Student firstName:', student.firstName);
                console.log('====Password hash exists:', student.password ? 'YES' : 'NO');
                
                if(bcrypt.compareSync(password, student.password)) {
                    console.log('====Student password match successful');
                    const token = jwt.sign({ id: student._id, username: student.studentNumber }, jwtKey, 
                        {algorithm: 'HS256', expiresIn: jwtExpirySeconds });
                    
                    res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true});
                    res.status(200).send({ screen: student.studentNumber });
                    
                    req.student = student;
                    next();
                } else {
                    console.log('====Student password mismatch for:', studentNumber);
                    res.json({status:"error", message: "Invalid student number/password!!!", data:null});
                }
            } else {
                console.log('====Student not found in database:', studentNumber);
                res.json({status:"error", message: "Invalid student number/password!!!", data:null});
            }
        }
    });
};

// Protected page uses the JWT token
exports.welcome = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).end();
    }
  
    var payload;
    try {
      payload = jwt.verify(token, jwtKey);
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res.status(401).end();
      }
      return res.status(400).end();
    }
    res.send(`${payload.username}`);
};

// Sign out function
exports.signout = (req, res) => {
    res.clearCookie("token");
    return res.status('200').json({message: "signed out"});
};

// Check if the student is signed in
exports.isSignedIn = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.send({ screen: 'auth' }).end();
    }
    var payload;
    try {
      payload = jwt.verify(token, jwtKey);
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res.status(401).end();
      }
      return res.status(400).end();
    }
    res.status(200).send({ screen: payload.username });
};

// Check whether a student is currently authenticated
exports.requiresLogin = function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.send({ screen: 'auth' }).end();
    }
    var payload;
    try {
      payload = jwt.verify(token, jwtKey);
      req.id = payload.id;
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res.status(401).end();
      }
      return res.status(400).end();
    }
    next();
};