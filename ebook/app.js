//应用入口

var bookLibs = require('./book');
var book = new bookLibs.book();

book.init().run();