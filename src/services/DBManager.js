const ModalEntity = require("../services_helper/ModalEntity");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/tydy");

class DBManager {
  constructor(framework, config) {
    this.fr = framework;
    this.config = config;
    console.log("SERVICE : DB-MANAGER");
  }

  initialize() {
    let path = this.config.dir.app + this.config.dir.models;
    let entities = require(path);
    this.db = {};
    for (var enty of entities) {
      this.db[enty.collection_name] = new ModalEntity(enty);
    }
  }
}

module.exports = DBManager;
