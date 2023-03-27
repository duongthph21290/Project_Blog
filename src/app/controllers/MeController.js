const Course = require('../models/courses');
const { multipleMongooseToObject } = require('../../util/mongoose');


class MeController {
    // Sử dụng phương thức [GET] / me/stored/courses
    storedCourses(req, res, next) {

    

        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses)
                })
            )
            .catch(next);
    };

    // Sử dụng phương thức [GET] / me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next);
    }
}



module.exports = new MeController();





