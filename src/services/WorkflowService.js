const bcrypt = require("bcrypt");
const saltRounds = 10;
const _ = require("underscore");

class WorkflowService {
  constructor(framework, config) {
    this.fr = framework;
    this.config = config;
    console.log("SERVICE : WORKFLOW-SERVICE");
  }

  async initialize() {}

  async home(req, res) {
    let data = await this.get();
    res.render("home", { data });
  }

  async create(req, res) {
    let values = req.body;
    if (values.password) {
      values.password = await this.cryptPassword(values.password);
    }
    this.fr.DBManager.db.registrations
      .save(values)
      .then((result) => {
        res.send({ status: "done" });
      })
      .catch((err) => {
        res.send({ err: err, status: "error" });
      });
  }

  async update(req, res) {
    let values = req.body;
    let id = req.params.id;
    if (values.password) {
      values.password = await this.cryptPassword(values.password);
    }
    this.fr.DBManager.db.registrations
      .findByIdAndUpdate(id, values)
      .then((result) => {
        res.send({ status: "done" });
      })
      .catch((err) => {
        res.send({ err: err, status: "error" });
      });
  }

  async remove(req, res) {
    let params = req.params;
    this.fr.DBManager.db.registrations
      .removeOne({ _id: params.id })
      .then((result) => {
        res.send({ status: "done" });
      })
      .catch((err) => {
        res.send({ err: err, status: "error" });
      });
  }

  async get(query = {}) {
    return this.fr.DBManager.db.registrations
      .find(query)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async find(req, res) {
    let params = req.params;
    let data = await this.get({ _id: params.id });
    data = data && data[0];
    res.send(_.omit(data, "password"));
  }

  cryptPassword(password) {
    return bcrypt.hash(password, saltRounds).then(function (hash) {
      return hash;
    });
  }

  matchPassword(password, hash) {
    return bcrypt.compare(password, hash, function (err, result) {
      return result;
    });
  }
}

module.exports = WorkflowService;
