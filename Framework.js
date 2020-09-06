const fs = require("fs");
const ServicePath = "/src/services";
const express = require("express");
var app = express();
var path = require("path");
var cors = require("cors");
var expHandlerbar = require("express-handlebars");
const bodyParser = require("body-parser");

class FrameWorkServer {
  constructor(config) {
    this.config = config;
  }

  initialize() {
    this.api = app;
    this.api.use(express.static(this.config.dir.app + "/src/public"));
    this.api.set("views", path.join(this.config.dir.app, "/src/views"));
    this.api.set("view engine", "handlebars");
    this.api.engine("handlebars", expHandlerbar({ defaultLayout: "main" }));
    this.api.use(bodyParser.json());
    this.api.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.api.use(cors());
    this.api.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });

    this.configureServices()
      .then(() => this.DBManager.initialize())
      .then(() => this.RouterManager.initialize())
      .then(() => this.WorkflowService.initialize())
      .catch((err) => console.log(err));
  }

  configureServices() {
    let serviceDir = this.config.dir.app + ServicePath;
    let services = fs.readdirSync(serviceDir);
    for (let f of services) {
      let _s = require(serviceDir + "/" + f);
      this[f.split(".")[0]] = new _s(this, this.config);
    }
    return Promise.resolve();
  }

  start() {
    app.listen(this.config.port, (res) => {
      console.log("SERVER RUNNING ON PORT : ", this.config.port);
    });
  }
}

module.exports = FrameWorkServer;
