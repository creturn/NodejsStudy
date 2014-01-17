//加载自定义server模块
var server = require('./server');
var route = require('./route');
var requestHandlers = require('./requestHandler');

var handle = {};
handle['/'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;
server.start(route.route, handle);