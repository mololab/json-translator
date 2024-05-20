declare module 'properties' {
    export function createStringifier(): any;

    export function parse(data: any, options: any, cb: any): any;

    export function stringify(stringifier: any, options: any, cb: any): any;
}

