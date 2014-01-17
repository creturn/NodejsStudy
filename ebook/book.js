/**
 * 抓取书本处理
 */

var bookApplication = function() {
    var db;
    var net;
    var $;
    /**
     * 初始化操作
     * @return {[obj]}
     */
    this.init = function() {
        console.log('init bookApplication');
        net = require('./NetUtils').create;
        db = require('./db').create;
        $ = require('jQuery');
        return this;
    }
    /**
     * 启动应用
     * @return {[obj]}
     */
    this.run = function() {
        console.log('application running ...');
        this.getBookList(1, 20);
        return this;
    }
    /**
     * 获取书本列表
     * @param  {int} startPage 起始页码
     * @param  {int} endPage   结束页码
     */
    this.getBookList = function(startPage, endPage) {
        //http://www.abcsee.net/book-21962.html 结束id 21962
        for (; startPage < endPage; startPage++) {
            net.getUrlContent('http://www.abcsee.net/book-' + startPage + '.html', this.getBookContent, 'GBK');
        };

    }
    /**
     * 获取书本介绍信息
     * @param  {string}   html
     * @param  {Function} callback
     */
    this.getBookContent = function(html) {

        var bookName = $(html).find('#content > dd > h1').html();
        var bookArticleUrl = $(html).find('#content .hst').attr('href');
        var bookImage = $(html).find('#content .hst img').attr('src');
        var descript = $(html).find('#content > dd > p').eq(1).html();
        var bookType = $(html).find('#content table a').html();
        console.log('书名:' + bookName);
        console.log('文章:' + bookArticleUrl);
        console.log('封面:' + bookImage)
        console.log('简介:' + descript);
        console.log('类别:' + bookType);
    }
    /**
     * 获取书本章节列表
     * @param  {string} url
     */
    this.getArticleList = function(url) {

    }
    /**
     * 获取书本内容信息
     * @param  {string} url
     */
    this.getArticleContent = function(url) {

    }

};

exports.book = bookApplication;