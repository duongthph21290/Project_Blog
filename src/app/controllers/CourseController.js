const Course = require('../models/courses');
const { mongooseToObject } = require('../../util/mongoose');


class CourseController {
    // Sử dụng phương thức [GET] / Course/:slug
    show(req, res, next) {

        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', { course: mongooseToObject(course) });
            })
            .catch(next);
    }


    // Sử dụng phương thức [GET] / Course/create
    create(req, res, next) {
        res.render('courses/create');
    }




    // Sử dụng phương thức [POST] / Course/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect(`/me/stored/courses`))
            .catch(next);
    }

    // Sử dụng phương thức [GET] / Course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
    }

    // Sử dụng phương thức [PUT] /course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }


    // Sử dụng phương thức [DELETE] /course/:id
    remove(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // Sử dụng phương thức [DELETE] /course/:id/real
    real(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // Sử dụng phương thức [PATCH] /course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //Sử dụng phương thức [POST] /course/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Lỗi rồi huhu' })
        }
    }

    //        
    //         
    //        
    //     }
    //   }



}
module.exports = new CourseController();





