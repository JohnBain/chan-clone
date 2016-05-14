var mysql = require('mysql');
var express = require('express');
var send = require('send')
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('client'))
app.use(bodyParser());

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'jbain1',
  password: '',
  database: 'chan'
});

function renderLayout(content) {
  return `<!doctype><html>
  <html lang="en">
  <head>
    <meta charset="utf-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to our chan</title>
  </head>
  
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
  <script src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
  <script type="text/javascript" src="../js/main.js"></script>

  <body>
  <div class="row">
    <div class="col-sm-10">Welcome to our experimental *chan clone.</div>
  </div>
  <div class="row">
    <div class="col-sm-6 col-sm-offset-4 col-lg-6 col-lg-offset-4 col-md-6 col-md-offset-4">
      <form action="/createpost" method="POST" id="usrform">
      <input type="text" class="name" name="name" placeholder="Enter name">
      <input type="text" class="img" name="img" placeholder="Enter image url">
      </form>
      <textarea name="comment" class="comment" rows="10" cols="50"  form="usrform">Enter text here...</textarea>
      <button type="submit" form="usform" id="submit">Submit!</button>
  </div>

    </div>
    
  </div>

  </div>
  ${content}
  </body>
  </html>
  `
}

function renderPost(post){
 return  `
          <div class="row">
            <div class="row-sm-12 col-lg-12">
            ${post.id} posted by ${post.name} at ${post.createdAt}
            </div>
            <div class="col-sm-4 col-lg-4">
             <a href="${post.img}" class="thumbnail">
             <img src="${post.img}"" alt="img"></a>
            </div>
           <div class="col-sm-4">${post.text}</div>
          
          </div>`
}

app.get('/', function(req, res) {
  var finalstring = ''
  conn.query('select * from Posts;',
    function(err, result) {
      if (err) {
        res.sendFile('404.html')
      }
      else {
        result.forEach(function(post) {
          finalstring += renderPost(post)

        })
        res.send(renderLayout(finalstring))
      }
    })
})

app.post('/post', function(req, res) {
  console.log(req.body, "HI");
  conn.query(`INSERT INTO Posts (text, img) VALUES (?, ?)`, [req.body.text, req.body.image], function(err, result){
    if (err){
      console.log(err, "Post error")
    }
    else {
      res.send("/")
    }
  })
})

//  'INSERT INTO `posts` (`userId`, `title`, `url`, `subredditId`, `selftext`, `createdAt`) VALUES (?, ?, ?, ?, ?)', [post.userId, post.title, post.url, post.subredditId, post.selftext, null],



var server = app.listen(process.env.PORT, process.env.IP, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});