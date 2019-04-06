#!/usr/bin/env ts-node
import { lstatSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
export default class Utils {

    private isFile = source => lstatSync(source).isFile();
    private isDirectory = source => lstatSync(source).isDirectory();
    private getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(this.isDirectory);

    private cwd: string;
    private children: string[];
    constructor() {
        this.cwd = process.cwd();
        this.children = this.getDirectories(this.cwd);
    }

    checkIfFile(...paths: string[]): boolean {
        if (paths.length >= 1) {
            paths.forEach(path => {
                if (!this.isFile(path)) {
                    console.log(path + " is not a valid path.");
                    return false;
                }
            });
            return true;
        } else {
            return false;
        }
    }

    checkIfDirectory(...paths: string[]): boolean {
        if (paths.length >= 1) {
            paths.forEach(path => {
                if (!this.isDirectory(path)) {
                    console.log(path + " is not a valid path.");
                    return false;
                }
            });
            return true;
        } else {
            return false;
        }
    }

    checkIfCSS(...paths: string[]): boolean {
        if (paths.length >= 1) {
            paths.forEach(path => {
                if (!path.includes('.css', -4)) {
                    console.log(path + " is not a .css file.");
                    return false;
                }
            });
            return true;
        } else {
            return false;
        }
    }

    getFiles(path: string = "./"): string[] {
        return [""];
    }

    sortFile(path: string, descending: boolean = false): boolean {
        return true;
    }

}