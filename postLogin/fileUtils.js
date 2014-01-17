var dir = 'test';
var fs = require('fs');
// var path = require('path');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, 0755);
}

var time = new Date();
//写入文件
fs.open(dir + '/cookie.txt', 'a', 0644, function(e, fd) {
    if (e) {
        throw e;
    }
    fs.write(fd, "first test" + time.getTime(), 0, 'utf8', function(e) {
        if (e) {
            throw e
        };
        fs.closeSync(fd);
    });
});
//写入文件
fs.writeFile(dir + '/sessionID.txt', "this is sessionID", function(e) {
    if (e) {
        throw e
    };
});
//删除目录
fs.rmdir(dir, function(e) {
    if (e) {
        console.log(e);
    };
});
//获取指定目录

files = fs.readdirSync('.');
files.forEach(function(file) {
    console.log(file);
});

//监控某文件变化

fs.watchFile(dir + "/cookie.txt", function(curr, prev) {
    console.log('file be changed');
    console.log("The current mtime is: " + curr.mtime);
    console.log("The previous mtime was: " + prev.mtime);
});