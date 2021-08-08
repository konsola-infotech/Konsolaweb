import { RequestHandler } from "express";
import fs from "fs";
import { createReadStream } from "fs";
import path from "path";

function log(...args: any) {
    if (process.env.logs == "true") {
        console.log(...args)
    }
}

let kStatic: RequestHandler = (req, res, next) => {
    let filename;

    if (path.basename(req.url).includes(".") || req.method !== "GET") {
        next()
    } else {
        filename = path.basename(req.url) ? `${req.url}.html` : "index.html"
        // log(path.resolve(`static/${filename}`))
        // log(path.join(`static/${filename}`))
        if (fs.existsSync(path.resolve(`static/${filename}`))) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            fs.createReadStream(path.join(`static/${filename}`)).pipe(res)
        } else next();
    }
}

export { kStatic, log }