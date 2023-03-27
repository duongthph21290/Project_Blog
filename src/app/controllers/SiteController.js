const Course = require('../models/courses');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // Sử dụng phương thức [GET] / (home)
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses)
                });
            })
            .catch(next);
    }
    // Sử dụng phương thức [GET] / search
    search(req, res) {
        res.render("search");

    }
}
module.exports = new SiteController;


// const NewController = require(".")


