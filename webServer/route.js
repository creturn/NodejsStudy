//路由
function route(handle, pathname, response, request) {
    console.log("request for" + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    } else {
        response.writeHead(404, {
            "Content-Type": "text/html"
        });
        response.write('Not found request');
    }
}

exports.route = route;