import { lstatSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

// Directory checking
const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

let cwd: string = process.cwd();
let cwd_children: string[] = getDirectories(cwd);

// Arguments
if (process.argv.length > 2) {
    let dir_args: string[] = [];
    let file_args: string[] = process.argv.slice(2);
    let file_count: number = file_args.length;

    for (let i = 0; i < file_args.length; ++i) {
        if (!file_args[i].includes('.css', -4)) {
            file_count -= 1;
            dir_args.push(file_args.splice(i, 1).toString());
            i -= 1;
            console.log("No .css\n");
        } else {
            let tmp_path: string = process.cwd() + '\\' + file_args[i];
            if (!existsSync(tmp_path)) {
                console.log("FAKE FILE : (" + tmp_path + ")\n");
                file_count -= 1;
                file_args.splice(i, 1);
                i -= 1;
            } else {
                console.log("Path exists!");
            }
        }
    }

    for (let i = 0; i < dir_args.length; ++i) {
        // console.log()

    }

    if (file_count > 0) {
        // Confirmed .css arguments
    } else {
        console.log('Could not find any CSS files based on provided arguments.\n')
    }
}
// No arguments (recursive cwd sort)
else {
    if (cwd_children.length > 0) {

    }
}