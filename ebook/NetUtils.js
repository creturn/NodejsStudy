/**
 * 网络访问工具包
 */
var NetUtils = function() {

    http = require('http');
    Iconv = require('iconv').Iconv;
    gbk_to_utf8 = new Iconv('GBK', 'UTF8');
    url_utils = require('url');

    /**
     * 获取指定URL内容
     * @param  {string}   url
     * @param  {function} callback
     */
    this.getUrlContent = function(url, callback, charset) {

        var opstion = url_utils.parse(url);
        opstion.headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:26.0) Gecko/20100101 Firefox/26.0",
            "Accept-Language": "zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
        };

        var req = http.get(opstion, function(res) {

            var html = '';
            if (charset == 'GBK') res.setEncoding('binary');

            res.on('data', function(chunk) {
                html += chunk;
            }).on('end', function() {
                if (charset == undefined || charset == 'utf8') {
                    callback(html, url);
                } else {
                    try {
                        callback(gbk_to_utf8.convert(new Buffer(html, 'binary')).toString(), url);
                    } catch (err) {
                        console.log(err);
                    }
                }
            }).on('error', function(e) {
                console.log('Fetch Url Error:' + url);
                console.log('Error:' + e.message);
            });
        });
        //异常处理，比如断网
        req.on('error', function(e) {
            console.log('Got Http Get Error:' + e.message);
            console.log('Fetch Url Error:' + url);
        });
        return this;
    }
}

exports.create = new NetUtils();