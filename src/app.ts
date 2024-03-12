import SwaggerParser from "@apidevtools/swagger-parser";
import path, { parse } from "path";

interface request {
    tags?: [];
    summery?: string;
    description?: string;
    operationId?: string;
    requestBody?: object;
    responses: object;
}


function parsePaths2(paths: { [key: string]: object }) {
    console.log("\n-- Paths and Methods --\n");
    for (const key in paths) {
        if (paths.hasOwnProperty(key)) {
            console.log(`Path: '${key}'`);
            //console.log(paths[key]);
            const methods = paths[key];
            for (const method in methods){
                console.log(`\tMethod: ${method}`)
            }
        }
    }
    console.log("\n-- Parsed String --\n");
    console.log(paths);
}

function parsePaths(paths: { [key: string]: any }) {
    console.log("\n-- Paths and Methods --\n");
    for (const keyPath in paths) {
        console.log(`Path: '${keyPath}'`);
        const methods: { [key: string]: any } = paths[keyPath];
        for (const keyMethod in methods){
            console.log(`Method: '${keyMethod}'`);
            const requestProperties: { [key: string]: any } = methods[keyMethod];
            //console.log(methods[keyMethod]);
            // for(const keyRequestProperty in requestProperties){
            //     console.log(requestProperties[keyRequestProperty]);
            // }
            console.log(`requestBody: ${requestProperties['requestBody']}`);
            console.log(requestProperties['requestBody']);
        }
    }
    // console.log("\n-- Parsed String --\n");
    console.log(paths);
}




async function main() {
    let parser = new SwaggerParser();

    console.log("Başlıyor!");


    try {
        let api = await parser.validate("swagger2.yml");
        //console.log("API name: %s, Version: %s", api.info.title, api.info.version);
        let $refs = await parser.resolve("swagger2.yml");
        //let apiJs = await parser.dereference("swagger2.yaml");
        //let name = $refs.get("swagger2.yaml#/properties/name");
        //console.log($refs.paths);
        //console.log(api.paths);
        // console.log("-- $refs --")
        // console.log($refs);         // type of $refs = object
        // gerçekte var değil ne demek ?
        // const consumes = $refs.get("swagger.json#/consumes");
        // console.log("Consumes:", consumes);
        // const schemes = $refs.get("swagger.json#/schemes");
        // console.log("Schemes:", schemes);
        const paths: { [key: string]: object } = $refs.get("swagger2.yml#/paths");
        //console.log(paths);
        const schemas: { [key: string]: object } = $refs.get("swagger2.yml#/components/schemas/Pet/properties");
        //console.log(schemas);
        parsePaths(paths);
        //console.log("Paths:", paths);
        // console.log("-- api --")
        // console.log(api);           // type of api = object
        // console.log("-- filePaths --")
        // console.log(filePaths)
        //let $refs = await parser.resolve("swagger.json");
        //console.log($refs);

        // $refs.paths() returns the paths of all the files in your API
        //let filePaths = $refs.paths();
        //console.log(filePaths);
        
        // $refs.get() lets you query parts of your API
        //let name = $refs.get("schemas/person.yaml#/properties/name");
        
        // $refs.set() lets you change parts of your API
        //$refs.set("schemas/person.yaml#/properties/favoriteColor/default", "blue");

    } catch (err) {
        console.error(err);
    }
}

main();
