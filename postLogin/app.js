/**
 * 模拟登陆
 */

var https = require("https");
var query = require("querystring");

var loginCodeUrl = "https://kyfw.12306.cn/otn/passcodeNew/getPassCodeNew.do?module=login&rand=sjrand&0.27336162992543445";
var loginUrl = "https://kyfw.12306.cn/otn/login/loginUserAsyn?random=";
time = new Date();
var loginData = query.stringify({
    "loginUserDTO.user_name": "fdsafdsa",
    "userDTO.password": "fds",
    "randCode": "1343"
});

var options = {
    host: "kyfw.12306.cn",
    path: "/otn/login/loginUserAsyn?random=" + time.getTime(),
    method: "POST",
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    headers: {
        "Host": "kyfw.12306.cn",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:26.0) Gecko/20100101 Firefox/26.0",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "Referer": "https://kyfw.12306.cn/otn/leftTicket/init",
        "Content-Length": loginData.length,
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    }
};

var req = https.request(options, function(res) {
    console.log(res.headers);
    res.on("data", function(data) {
        console.log(data.toString());
    });
});
req.on("error", function(e) {
    console.error(e);
});
req.write(loginData);
req.end();