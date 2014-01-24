// net = require('./NetUtils').create;

var bookPath = './book/';
var file = require('fs');
var request = require('request');
var fs = require('fs');
//先加载任务到内存当中
console.log("Load json book List");
var bookImgList = [];
var dirList = file.readdirSync(bookPath);
dirList.forEach(function(item) {
    if (!file.statSync(bookPath + item).isDirectory()) {
        if (item.split('.').pop() == 'json') {
            try {
                var jsonContent = JSON.parse(file.readFileSync(bookPath + item));
                jsonContent.img
                bookImgList.push(jsonContent.img);
            } catch (e) {
                console.log('JSON PARSE ERROR' + e);
            }

        };
    };
});
console.log("Have " + bookImgList.length + " num book image will be download");
var bookImagePath = './bookimg/';
bookImgList.forEach(function(imgUrl) {
    var artSaveName = bookImagePath + require('crypto').createHash('md5').update(imgUrl).digest('hex') + '.' + imgUrl.split('.').pop();
    if (!fs.existsSync(artSaveName)) {
        var options = {
            uri: imgUrl,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:26.0) Gecko/20100101 Firefox/26.0',
                'Accept': '*/*',

            }

        };
        request(options).pipe(fs.createWriteStream(artSaveName)).on('error', function(error) {
            console.log('error:' + error);
        });
    }
});


// request(options, function(err, res, body) {

// });


// request(options).pipe(fs.createWriteStream('./bookimg/1.jpg'));
// bookImgList.forEach(function(url) {
//     var bookImagePath = './bookimg/';
//     var artSaveName = bookImagePath + require('crypto').createHash('md5').update(url).digest('hex') + '.' + url.split('.').pop();
//     if (!file.existsSync(artSaveName)) {
//         console.log(url);
//         request(url).pipe(fs.createWriteStream(artSaveName));
//         process.exit(1);
//     };
//     // if (book.status == 0) {
//     //     net.getUrlContent(book.artUrl, function(html) {
//     //         var artList = $(html).find('#a_main .bdsub table a');
//     //         var artArrayList = [];
//     //         for (var i = 0; i < artList.length; i++) {
//     //             artArrayList.push({
//     //                 articleTitle: $(artList[i]).html(),
//     //                 articleContentUrl: book.artUrl + $(artList[i]).attr('href')
//     //             });
//     //         }
//     //         book.artList = artArrayList;
//     //         if (artArrayList.length > 0) {
//     //             book.status = 1;
//     //             file.writeFile(bookPath + book.id + '.json', JSON.stringify(book));
//     //         } else {
//     //             console.log('book can\'t get Artcles  names ID: ' + book.id);
//     //         }
//     //     }, 'GBK');
//     // };

// });