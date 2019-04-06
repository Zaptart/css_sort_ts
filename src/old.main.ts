import { lstatSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

// Directory checking
const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

let cwd: string = process.cwd();
let cwd_children: string[] = getDirectories(cwd);

// Arguments
if (process.argv.length > 2) {
    let args = process.argv.slice(2);
    let dir_args: string[] = [];
    let file_args: string[] = [];
    let arg_count: number = args.length;

    console.log(file_args.toString());

    for (let i = 0; i < args.length; ++i) {
        if (!args[i].includes('.css', -4)) {
            //Argument doesn't include a .css file extension
            arg_count -= 1;
            i -= 1;
            if (isDirectory(args[i])) {
                // IF dir, add to list
                dir_args.push(args.splice(i, 1).toString());
            } else {
                // ELSE trash
                file_args.splice(i, 1);
            }
        } else {
            let tmp_path: string = process.cwd() + '\\' + file_args[i];
            if (!existsSync(tmp_path)) {
                // Not a file in active directory
                arg_count -= 1;
                i -= 1;
                args.splice(i, 1);
            } else {
                file_args.push(args.splice(i, 1).toString());
                console.log("Path exists!");
            }
        }
    }

    for (let i = 0; i < dir_args.length; ++i) {
        console.log(dir_args[i] + "\n");
    }

    if (arg_count > 0) {
        // Confirmed .css arguments
    } else {
        console.log('Could not find any CSS files based on provided arguments.\n');
    }
}
// No arguments (recursive cwd sort)
else {
    if (cwd_children.length > 0) {
        console.log("No arguments received, searching current directory...");
    }
}