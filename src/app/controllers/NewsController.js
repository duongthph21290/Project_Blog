class NewsController {
    // Sử dụng phương thức [GET] / news
    index(req, res) {
        res.render('news');
    }

    // Sử dụng phương thức [GET] / news/:slug
    show(req, res) {
        res.send("NEW DETAIL!");
    }

}
module.exports = new NewsController;


// const NewController = require(".")