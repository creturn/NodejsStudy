var querystring = require('querystring'),
    fs = require('fs'),
    formidable = require('formidable');

function start(response, request) {
    response.write('<!doctype html> <html lang="en"> <head> <meta charset="UTF-8"> <title>upload</title> </head> <body> <form action="/upload" method="post" enctype="multipart/form-data"> <input type="file" name="file"> <input type="submit"> </form> </body> </html>');
    response.end();
}

function upload(response, request) {
    console.log('Request handler upload');
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.renameSync(files.file.path, '/tmp/test.png');
        console.log(files);
        response.write(files.file.path);
        response.write('<img src="/show" />')
        response.end();
    });
}

function show(response, request) {
    console.log('Request show handler be called!');
    fs.readFile('/tmp/test.png', 'binary', function(err, file) {
        if (err) {
            response.writeHead(500, {
                'Content-Type': 'text/html'
            });
            response.write(err + "\n");
            response.end();
        } else {
            response.writeHead(200, {
                'Content-Type': 'image/png'
            });
            response.write(file, 'binary');
            response.end();
        }
    });
}
exports.start = start;
exports.upload = upload;
exports.show = show;