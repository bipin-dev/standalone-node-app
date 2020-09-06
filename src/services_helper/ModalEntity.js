const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var conn = mongoose.connection;

class ModalEntity {
  constructor(enty) {
    this.entity = enty;
    this.collection_name = enty.collection_name;
    this.fields = enty.fields;
    this.schema = mongoose.Schema(this.fields);
    this.modal = conn.model(this.collection_name, this.schema);
  }

  getInstanceofModel(data) {
    return new this.modal(data);
  }

  async save(data) {
    var inst = this.getInstanceofModel(data);
    // var isvalid = _vaidator(inst);
    return new Promise(function (resolve, reject) {
      inst
        .save()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log("error while saving data ", err);
          reject(err);
        });
    });
  }

  removeOne(query) {
    return this.modal
      .deleteOne(query)
      .then((res) => {
        console.log("delete one : ", query);
        return res;
      })
      .catch((err) => {
        console.log("inside the deleteOne function ", err);
      });
  }

  removeMany(query) {
    return this.modal
      .deleteMany(query)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("inside the deleteMany function ", err);
      });
  }

  findOne(query) {
    return this.modal
      .findOne(query)
      .then((res) => {
        return res.toObject();
      })
      .catch((e) => {
        console.log("error occur while finding one record");
      });
  }

  async findById(id) {
    return await this.modal
      .findById(id)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        logger.error("findById  ", e);
      });
  }

  find(query) {
    return this.modal
      .find(query)
      .then((res) => {
        let tempRec = res.map(function (model) {
          return model.toObject();
        });
        return tempRec;
      })
      .catch((e) => {
        console.log("error occure while performing action ");
      });
  }

  findByIdAndUpdate(id, updateObj) {
    return this.modal
      .findByIdAndUpdate(id, updateObj)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        logger.error("findbyIdandUpdate: ", e);
      });
  }

  async updateOne(query, obj) {
    return this.modal
      .updateOne(query, obj)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.log("inside updateOne : ", e);
      });
  }
}

module.exports = ModalEntity;
