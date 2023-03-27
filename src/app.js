const path = require('path');
// framework express: npm i express
const express = require('express');
// import express from 'express';
// Thư viện morgan : npm i morgan
const morgan = require('morgan');
// Template handlebars:
const { engine } = require('express-handlebars');
// Kết nối database
const db = require('./config/db');
//Connect to DB
db.connect();

const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');




const app = express();
const port = 3000;



const route = require("./routes");

//Khai báo file tĩnh (static): (ảnh)
app.use(express.static(path.join(__dirname, 'public/')));

// HTTP logger
app.use(morgan('combined'));

//Sử dụng middleware: Sử dụng middleware để xử lí dữ liệu từ FORM submit lên cho chúng ta: 
app.use(express.urlencoded({
    extended: true
}));

// Sử dụng một số thư viện JS:  XMLHttpRequest, fetch, axios Gửi lên server (Từ js)
app.use(express.json());

// Middleware
app.use(methodOverride('_method'));
// Custom Middleware
app.use(SortMiddleware);


// Templace engine
// app này sử dụng template là hadlebars và
// name đặt là handlebars và đang sử dụng thư viện của handlebars
app.engine('hbs', engine({
    //Khai báo tên viết tắt : handlebars (hbs):
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        sorttable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default';

//desc: Từ trên xuống dưới
//asc: Từ dưới lên trên
            const icons = {
                default: 'fas fa-sort',
                asc: 'fas fa-caret-up',
                desc: 'fas fa-caret-down',
            };
            const types = { 
                default: 'desc',
                asc: 'desc',
                desc: 'asc',
            }
            const icon = icons[sortType];
            const type = types[sortType];
            return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`;
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './resources/views'));


// Routes init ( Khởi tạo tuyến đường)
route(app);


// 127.0.0.1 - localhost
app.listen(port, () => console.log(`Đang chạy cổng : http://localhost:${port}`));


// CÁC PHƯƠNG THỨC:
//GET :  GỬI YÊU CẦU LÊN SERVER VÀ YÊU CẦU SERVER TRẢ LẠI DỮ LIỆU CHO CLIENT
//POST:  GỬI YÊU CẦU LÊN SERVER VÀ YÊU CẦU SERVER LƯU LẠI 1 DỮ LIỆU HOẶC TẠO MỚI 1 DỮ LIỆU
// PUT/ PATCH : CHỈNH SỬA DỮ LIỆU
// PUT : SỬA HẾT
// PATCH:  SỬA TỪNG DỮ LIỆU