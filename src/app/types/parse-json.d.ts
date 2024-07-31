declare module 'parse-json' {
    function parseJson(input: string, reviver?: (key: any, value: any) => any, filename?: string): any;
    namespace parseJson { }
    export = parseJson;
}
