const express = require('express')
const app = express()

//可以使用名為public資料夾底下的資料
app.use(express.static('public'));

//可以使用名為uploads資料夾底下的資料
app.use(express.static('uploads'));


//使用router資料夾下的course
const course = require('./routes/course');
app.use('/', course);

const course_list = require('./routes/course_list');
app.use('/', course_list);

const course_search = require('./routes/course_search');
app.use('/', course_search);


const video = require('./routes/video');
app.use('/', video);




app.get('/', (req, res) => {
    res.send('HEY!')
})

app.listen(3000), () => console.log('伺服器已經啟動在http://localhost:3000/')