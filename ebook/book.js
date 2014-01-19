/**
 * 抓取书本处理
 */

var bookApplication = function() {
    var db;
    var net;
    var $;
    var file;
    /**
     * 初始化操作
     * @return {[obj]}
     */
    this.init = function() {
        console.log('init bookApplication');
        net = require('./NetUtils').create;
        db = require('./db').create;
        $ = require('jQuery');
        file = require('fs');
        return this;
    }
    /**
     * 启动应用
     * @return {[obj]}
     */
    this.run = function() {
        console.log('application running ...');
        //this.getBookList(1, 21963);
        // this.getBookList(1, 3);
        // this.getArticleList();
        this.getArticleContent();
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
        var bookType = $(html).find('#content table td').eq(0).find('a').html();
        var bookAuthor = $(html).find('#content table td').eq(1).html().replace('&nbsp;', '');
        var bookId = bookArticleUrl.split('/');
        bookId.pop();
        var bookInfo = {
            id: bookId.pop(),
            name: bookName,
            author: bookAuthor,
            artUrl: 'http://www.abcsee.net' + bookArticleUrl,
            img: bookImage,
            desc: descript,
            type: bookType,
            status: 0
        };
        file.writeFile('./book/' + bookInfo.id + '.json', JSON.stringify(bookInfo));
    }
    /**
     * 获取书本章节列表
     * @param  {string} url
     */
    this.getArticleList = function(url) {
        var bookPath = './book/';
        //先加载任务到内存当中
        console.log("Load json book List");
        var bookList = [];
        var dirList = file.readdirSync(bookPath);
        dirList.forEach(function(item) {
            if (!file.statSync(bookPath + item).isDirectory()) {
                if (item.split('.').pop() == 'json') {
                    try {
                        var jsonContent = JSON.parse(file.readFileSync(bookPath + item));
                        bookList.push(jsonContent);
                    } catch (e) {
                        console.log('JSON PARSE ERROR' + e);
                    }

                };
            };
        });
        console.log("have " + dirList.length + " num book be catched");
        bookList.forEach(function(book) {
            if (book.status == 0) {
                net.getUrlContent(book.artUrl, function(html) {
                    var artList = $(html).find('#a_main .bdsub table a');
                    var artArrayList = [];
                    for (var i = 0; i < artList.length; i++) {
                        artArrayList.push({
                            articleTitle: $(artList[i]).html(),
                            articleContentUrl: book.artUrl + $(artList[i]).attr('href')
                        });
                    }
                    book.artList = artArrayList;
                    if (artArrayList.length > 0) {
                        book.status = 1;
                        file.writeFile(bookPath + book.id + '.json', JSON.stringify(book));
                    } else {
                        console.log('book can\'t get Artcles  names ID: ' + book.id);
                    }
                }, 'GBK');
            };

        });
    }
    /**
     * 获取书本内容信息
     * @param  {string} url
     */
    this.getArticleContent = function(url) {
        var bookPath = './book/';
        var artPath = './article/';
        //先加载任务到内存当中
        console.log("Load json book List");
        var bookList = [];
        var dirList = file.readdirSync(bookPath);
        dirList.forEach(function(item) {
            if (!file.statSync(bookPath + item).isDirectory()) {
                if (item.split('.').pop() == 'json') {
                    bookList.push(JSON.parse(file.readFileSync(bookPath + item)));
                };
            };
        });
        bookList.forEach(function(book) {
            if (book.status == 1) {
                if (book.artList.length > 0) {
                    for (var i = 0; i < book.artList.length; i++) {
                        net.getUrlContent(book.artList[i].articleContentUrl, function(html, url) {
                            var artSaveName = require('crypto').createHash('md5').update(url).digest('hex') + '.txt';
                            var content = $(html).find('#contents').html().replace('<div id="txtright"></div>', '');
                            console.log("start save url:" + url);
                            file.writeFile(artPath + artSaveName, content);
                        }, 'GBK');
                    }
                }
            };
        });

    }

};

exports.book = bookApplication;