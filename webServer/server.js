var http = require('http');
var url = require('url');

function start(route, handle) {
    http.createServer(function(request, response) {
        var pathName = url.parse(request.url).pathname;
        var postData = '';
        //进行路由处理
        route(handle, pathName, response, request);

    }).listen(8080);
    console.log('server start');
}

exports.start = start;