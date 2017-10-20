const ytdl = require('ytdl-core');
const fs = require('fs');
var argv = require('yargs').argv;

let url = argv.url;
let resolution = argv.res;

let isValid = ytdl.validateURL(url);

if (isValid) {
    let videoID = ytdl.getURLVideoID(url);
    ytdl.getInfo(videoID).then((info) => {

        let format = ytdl.chooseFormat(info.formats, {
            resolution: resolution,
            container: 'mp4'
        });

        if (format) {
            console.log("Format Found!");
            console.log("Download in progress ...");
            ytdl(url, {
                format: format
            }).pipe(fs.createWriteStream(info.title + ' - ' + info.author.user + '.mp4'));

        } else {
            console.log("No Format Found!");
        }
    });
}else {
    console.log("Invalid Link!");
}
