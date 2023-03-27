const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Course = new Schema({
    name: {
        type: String, required: true,
    },
    des: {
        type: String
    },
    image: {
        type: String
    },
    videoID: {
        type: String, required: true,
    },
    level: {
        type: String
    },
    slug: {
        type: String, slug: 'name', unique: true
    },
},
    {
        timestamps: true,
    },
);

// Add plugin
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});
mongoose.plugin(slug);

module.exports = mongoose.model('Course', Course);