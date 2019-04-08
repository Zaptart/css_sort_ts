#!/usr/bin/env ts-node
import Utils from './utils';

export type Command = (util: Utils, key: string, ...args: string[]) => Promise<void>;

export class CLI {

    private key: string;
    private args: string[];
    private util: Utils;

    constructor() {
        this.util = new Utils();
        this.key = process.argv[2];
        this.args = process.argv.splice(3);
        const handler = CLI.commands[this.key];
        if (typeof handler !== 'function') {
            CLI.usage("", "Invalid subcommand, try one of the listed subcommands.");
            process.exit(2);
        }
        CLI.commands[this.key](this.util, this.key, ...this.args);
    }

    static usage(key_arg: string = "", detail: string = "") {
        const commandKeys = Object.keys(CLI.commands);
        if (key_arg == "") {
            console.log(`           CSS-Sort CLI
        
            Usage: node css_sort ${commandKeys.join('|')}
        
            ${detail}`);
        } else if (commandKeys.includes(key_arg)) {
            if (key_arg === "interactive") {
                detail += "\n\t    Description : Allows user to select directories and files to sort at runtime.\n\t    Arguments : NONE";
            } else if (key_arg == "sort") {
                detail += "\n\t    Description : Default sorting method, ascending line length.\n\t    Arguments : FILE or DIR";
            } else if (key_arg == "sort_desc") {
                detail += "\n\t    Description : Alternate sorting method, descending line length.\n\t    Arguments : FILE or DIR";
            } else if (key_arg == "help") {
                detail += "\n\t    Description : Provides usage help on subcommands.\n\t    Arguments : SUBCOMMAND[sort/sort_desc/interactive]";
            }
            console.log(`           CSS-Sort CLI
            
            '${key_arg}' usage: node css_sort ${key_arg} <arg>
            
            ${detail}`);
        }
    }
    static commands: { [s: string]: Command } = {
        async help(util: Utils, key: string, ...args: string[]) {
            if (args.length > 1) {
                CLI.usage(key, "Too many arguments, " + args.length + " arguments given, 1 expected.");
            } else if (args.length == 1) {
                if (!Object.keys(CLI.commands).includes(args[0])) {
                    CLI.usage("", "Invalid argument. Please use one of the listed sub-commands.");
                } else {
                    CLI.usage(args[0], "");
                }
            } else {
                CLI.usage("", "");
            }
        },
        async sort(util: Utils, key: string, ...args: string[]) {
            if (args.length >= 1) {
                if (util.checkIfFile(...args)) {
                    //arg contains file(s)
                } else if (util.checkIfDirectory(...args)) {
                    //args contains director(y/ies)
                }
            } else {
                //check active directory
            }
        },
        async sort_desc(util: Utils, key: string, ...args: string[]) {
            if (args.length >= 1) {
                if (util.checkIfFile(...args)) {
                    //arg contains file(s)
                } else if (util.checkIfDirectory(...args)) {
                    //args contains director(y/ies)
                }
            } else {
                //check active directory
            }
        },
        async interactive(util: Utils, key: string, ...args: string[]) {
            if (args.length >= 1) {
                CLI.usage(key, "Too many arguments, " + args.length + " arguments given, none expected.");
            } else if (args.length == 0) {
                // repl
            }
        }
    };

    // commands[key](...process.argv.slice(3));


}