const MeRouter = require('./me');
const NewsRouter = require('./news');
const SiteRouter = require('./site');
const coursesRouter = require('./courses');

function route(app) {
    app.use("/me", MeRouter);
    app.use("/news", NewsRouter);
    app.use("/courses", coursesRouter);
    app.use("/", SiteRouter);


}
module.exports = route;