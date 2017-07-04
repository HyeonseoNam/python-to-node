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
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');



// python shell
var PythonShell = require('python-shell');

var options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: '',
    args: ['value1', 'value2', 'value3']
};



app.get('/', function(req, res) {
    
    var output;
    PythonShell.run('black_box.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        // res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});
        // res.write(results);
        // res.end();
        output = results;
        console.log('output - ' + output);
        console.log('results - ' + results);
        console.log('results[0] - ' + results[0]);
        res.write('' + output);
        res.end();
    });
    // console.log('output_outside - ' + output);

});




http.createServer(app).listen(app.get('port'), function() {
   console.log('server running at https://127.0.0.1:' + app.get('port'));
});

