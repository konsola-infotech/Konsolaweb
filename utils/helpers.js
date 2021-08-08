"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.kStatic = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (process.env.logs == "true") {
        console.log.apply(console, args);
    }
}
exports.log = log;
var kStatic = function (req, res, next) {
    var filename;
    if (path_1.default.basename(req.url).includes(".") || req.method !== "GET") {
        next();
    }
    else {
        filename = path_1.default.basename(req.url) ? req.url + ".html" : "index.html";
        // log(path.resolve(`static/${filename}`))
        // log(path.join(`static/${filename}`))
        if (fs_1.default.existsSync(path_1.default.resolve("static/" + filename))) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            fs_1.default.createReadStream(path_1.default.join("static/" + filename)).pipe(res);
        }
        else
            next();
    }
};
exports.kStatic = kStatic;
