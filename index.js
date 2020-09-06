const path = require("path");
let config = require("./src/config");

const appPath = path.resolve(__dirname);
const frPath = path.resolve(__dirname, "./Framework.js");

config.dir.app = appPath;
config.dir.jr = frPath;

const Server = require(frPath);
const inst = new Server(config);
inst.initialize();
inst.start();
