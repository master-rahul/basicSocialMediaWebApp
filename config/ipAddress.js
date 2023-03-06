// module export is an object, allows for external usage.
module.exports.address = function () {
    const exe = require('child_process');
    var address = '';
    exe.exec("ifconfig en0 inet", function (error, stdout, stderr) {
        if (error) console.log('Not able to execute command in terminal');
        else if (stderr) console.log(stderr);
        else address = find(stdout);
    });
    return address;
}
function find(out) {
    var add = "inet";
    for (var i = 0; i < out.length; i++) {
        if (out.substring(i, i + 4) == add) {
            add = out.substring(i + 5, i + 21);
            add = add.substring(0, add.lastIndexOf(" "));
            console.log(add);
            return add;
        }
    }
    console.log(add);
    return '127.0.0.1';
}
