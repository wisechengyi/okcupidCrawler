/**
 * Created by yicheng3 on 1/17/15.
 */



process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

if (process.argv.length<5){
    console.log("fault")
    return
}

var username = process.argv[2]
var password = process.argv[3]
var input  = process.argv[4]
var output  = process.argv[5]





var fs = require("fs");
var filename = input
var fd = fs.openSync(filename, 'r');
var bufferSize = 1024;
var buffer = new Buffer(bufferSize);

var usernames = []

var leftOver = '';
var read, line, idxStart, idx;
while ((read = fs.readSync(fd, buffer, 0, bufferSize, null)) !== 0) {
    leftOver += buffer.toString('utf8', 0, read);
    idxStart = 0
    while ((idx = leftOver.indexOf("\n", idxStart)) !== -1) {
        line = leftOver.substring(idxStart, idx);
//        console.log("one line read: " + line);
        usernames.push(line)
        idxStart = idx + 1;
    }
    leftOver = leftOver.substring(idxStart);
}

//console.log(usernames)

var count = 0

var all_data = []

var OKCupid = require('okcupidjs')

var okc = new OKCupid()
okc.login(username,password,function(err, res, body){

    console.log(body)


var timer = setInterval(function () {
    if (count == usernames.length) {
        clearInterval(timer)
//            console.log(all_data)
        var outputFilename = output;

        fs.writeFile(outputFilename, JSON.stringify(all_data, null, 4), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + outputFilename);
            }
        });
    }

    var sn = usernames[count]
    count++

    okc.getUserProfile(sn, function (err, res, body) {
//            console.log(err)
//        console.log(count, ": ")
        if (res.statusCode == 200) {
            console.log(count+": "+body.age)
            all_data.push(body)
        }
        else {
            all_data.push(null)
            console.log(count+": "+"not found")

        }
//            console.log(body)
    })
}, 2000);

})