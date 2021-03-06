const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const check_member_token_and_status = require('./util/checkIsMemberLegal.js');

app.use(bodyParser.json({ limit: '50000mb' }));
app.use(bodyParser.urlencoded({ limit: '50000mb', extended: true }));

//可以使用名為public資料夾底下的資料
app.use(express.static('public'));

//可以使用名為uploads資料夾底下的資料
app.use(express.static('uploads'));

app.use(express.static('dao'));
app.use(express.static('util'));

//使用router資料夾下的course
const course_input = require('./routes/course_input');
app.use('/', course_input);

const course_list = require('./routes/course_list');
app.use('/', course_list);

const course_search = require('./routes/course_search');
app.use('/', course_search);

const video = require('./routes/video');
app.use('/', video);

const sign_api = require('./routes/sign_api');
app.use('/', sign_api);

const comment = require('./routes/comment');
app.use('/', comment);

const course_update = require('./routes/course_update');
app.use('/', course_update);

const gray_bar = require('./routes/gray_bar');
app.use('/', gray_bar);

const course = require('./routes/course');
app.use('/', course);

const profile = require('./routes/profile');
app.use('/profile', check_member_token_and_status, profile);

app.get('/', (req, res) => {
    res.send('HEY!');
});

app.listen(3000), () => console.log('伺服器已經啟動在http://localhost:3000/');
