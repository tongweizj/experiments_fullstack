const users = require('../../app/controllers/users.server.controller');
const courses = require('../../app/controllers/courses.server.controller');

module.exports = function (app) {
    app.route('/courses')
        .get(courses.list)
        .post(users.requiresLogin, courses.create);

    app.route('/courses/:courseId')
        .get(courses.read)
        .put(users.requiresLogin, courses.update)
        .delete(users.requiresLogin, courses.delete);

    app.param('courseId', courses.courseByID);
};
