/**
 * application
 * @return {object}
 */
var application = function() {
    $ = require('jQuery');
    fs = require('fs');
    /**
     * 启动器
     * @return {this} object
     */
    this.run = function() {
        console.log('run application');
        for (var i = 1; i < 100; i++) {
            this.getPageList(i);
        };

    }
    this.getPageList = function(page) {
        this.getUrlContent('http://guonei.news.baidu.com/n?cmd=4&class=civilnews&pn=' + page + '&sub=0', function(html) {
            // console.log(html);
            $(html).find('a').each(function() {
                var href = $(this).attr('href');
                if (href != undefined) {
                    var fileType = href.split('.').pop();
                    if (fileType == 'htm' || fileType == 'html' || fileType == 'shtml' || fileType == 'php') {
                        console.log('now get href:' + href);
                        var app = new application();
                        app.getUrlContent(href, app.saveHtml);

                    };
                }

            });
        });
    }

    this.saveHtml = function(html) {
        var time = new Date();
        var fileName = './html/' + time.getTime() + '.html';
        console.log('Now save File:' + fileName);
        fs.writeFile(fileName, html);
    }
    /**
     * 获取指定URL内容
     * @param  {string} url
     * @return {object}
     */
    this.getUrlContent = function(url, callback) {
        var http = require('http');
        http.get(url, function(res) {
            var content = '';
            res.on('data', function(buffer) {
                content += buffer;
            }).on('end', function() {
                //处理收到内容
                callback(content);
            });
        }).on('error', function(e) {
            console.log('Got error:' + e.message);
        });
    }
}

/**
 * run app
 */
new application().run();