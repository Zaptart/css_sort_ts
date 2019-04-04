"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
// Directory checking
var isDirectory = function (source) { return fs_1.lstatSync(source).isDirectory(); };
var getDirectories = function (source) { return fs_1.readdirSync(source).map(function (name) { return path_1.join(source, name); }).filter(isDirectory); };
// Arguments
if (process.argv.length > 2) {
    var dir_args = [];
    var file_args = process.argv.slice(2);
    var file_count = file_args.length;
    for (var i = 0; i < file_args.length; ++i) {
        if (!file_args[i].includes('.css', -4)) {
            file_count -= 1;
            dir_args.push(file_args.splice(i, 1).toString());
            i -= 1;
            console.log("No .css\n");
        }
        else {
            var tmp_path = process.cwd() + '\\' + file_args[i];
            if (!fs_1.existsSync(tmp_path)) {
                console.log("FAKE FILE : (" + tmp_path + ")\n");
                file_count -= 1;
                file_args.splice(i, 1);
                i -= 1;
            }
            else {
                console.log("Path exists!");
            }
        }
    }
    if (file_count > 0) {
        // Confirmed .css arguments
    }
    else {
        console.log('Could not find any CSS files based on provided arguments.\n');
    }
}
// No arguments (recursive cwd sort)
else {
    var cwd = process.cwd();
    var cwd_children = getDirectories(cwd);
    if (cwd_children.length > 0) {
    }
}
