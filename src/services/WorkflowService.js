var crypto = require("crypto");

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

    console.log("id is ... ", id);
    console.log("values ... ", values);

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
    res.send(data);
  }

  cryptPassword(password) {
    var algorithm = "aes256"; // or any other algorithm supported by OpenSSL
    var key = "password";
    var text = "I love kittens";

    var cipher = crypto.createCipher(algorithm, key);
    var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
    var decipher = crypto.createDecipher(algorithm, key);
    var decrypted =
      decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
  }
  decryptPassword() {}
}

module.exports = WorkflowService;
