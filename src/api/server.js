var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// POSTでdataを受け取るための記述
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 3000番を指定
var port = process.env.PORT || 3000;

// expressでAPIサーバを使うための準備
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

// 正しく実行出来るか左記にアクセスしてテストする (GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'Successfully Posted a test message.' });
});


// ルーティング登録
app.use('/api', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);
