var express = require("express");
var app = express()
  , blog = express()
  , blogAdmin = express();

app.use('/blog', blog);
blog.use('/admin', blogAdmin);
app.use('/log',blog);

console.log("1:",app.path()); // ''
console.log("2:",blog.path()); // '/blog'
console.log("3:",blogAdmin.path()); // '/blog/admin'