/**
 * 数据库操作Model
 */
var db = function() {
    this.saveBook = function(bookInfo) {
        console.log('saveBook be called');
    }
    this.saveArticle = function(bookInfo) {
        console.log('saveArticle be called');
    }
}

exports.create = new db();