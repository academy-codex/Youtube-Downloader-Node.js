const ytdl = require('ytdl-core');
const fs = require('fs');
var express = require('express');
var argv = require('yargs').argv;

var app = express();

app.get('/download', function(req, res){

    console.log("hello");

    res.setHeader('content-type', 'video/mp4');

    fs.createReadStream('./diwali.mp4').pipe(res);
});

app.get('/', function(req, res) {


    let url = argv.url;
    let resolution = argv.res;

    let isValid = ytdl.validateURL(url);

    if (isValid) {

        res.setHeader('content-type','video/mp4');
        let videoID = ytdl.getURLVideoID(url);
        ytdl.getInfo(videoID).then((info) => {

            let format = ytdl.chooseFormat(info.formats, {
                resolution: resolution,
                container: 'mp4'
            });

            if (format) {
                console.log("Format Found!");
                console.log("Download in progress ...");

                let totalSize = format.clen;
                console.log(format);

                // fs.watchFile(info.title + ' - ' + info.author.user + '.mp4', () => {
                //     fs.stat(info.title + ' - ' + info.author.user + '.mp4', function (err, stats) {
                //         console.log((stats.size / totalSize) * 100 + "%");
                //     });
                // });

                ytdl(url, {
                    format: format
                }).pipe(res);

            } else {
                console.log("No Format Found!");
            }
        });
    } else {
        res.send("Error");
        console.log("Invalid Link!");
    }

});

app.listen(3000);
