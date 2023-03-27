const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Blog_NodeJS');
        console.log('Kết nối thành công tới Database');
    } catch (error) {
        console.log('Kết nối thất bại');
    }
};

module.exports = { connect };