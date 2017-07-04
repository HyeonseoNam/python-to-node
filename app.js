// express 기본 모듈
var express = require('express');
var http = require('http');
var path = require('path');

// express 미들웨어
var bodyParser = require('body-parser');
var static = require('serve-static');

// express 객체 생성
var app = express();

// port 설정
app.set('port', process.env.PORT || 3000);

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// public static오픈
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// python shell
var PythonShell = require('python-shell');





app.get('/', function(req, res) {
    req.app.render('index', function(err, html) {
       if (err) throw err;
       res.end(html);
    });
});

// post action되었을때 미들웨어 parameter 확인 후 python 실행
app.use('/submit_data', function(req,res) {

    // POST 로 넘어온 값 확인
    var inputData = req.body.input_data;

    // options에 등록후
    var options = {
        mode: 'text',
        pythonOptions: ['-u'],
        args: [inputData]
    };

    // python code를 호출할때 parameter로 넘겨준다.
    PythonShell.run('black_box.py', options, function (err, result) {
        if (err) throw err;

        // 넘긴 후, 가공된 result를 context로 ejs view에 넘겨준다.
        var context = { result : result};
        // res.write('' + output);
        req.app.render('result_page', context, function(err, html) {
           if (err) throw err;
           res.end(html);
        });
    });
});


http.createServer(app).listen(app.get('port'), function() {
   console.log('server running at https://127.0.0.1:' + app.get('port'));
});

