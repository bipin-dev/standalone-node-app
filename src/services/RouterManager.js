class RouterManager {
  constructor(framework, config) {
    this.fr = framework;
    this.config = config;
    console.log("SERVICE : ROUTER-MANGER");
  }

  initialize() {
    let path = this.config.dir.app + this.config.dir.routes;
    let routes = require(path);
    return new Promise((resolve, reject) => {
      for (let r of routes) {
        this.fr.api[r.request_type](r.route, async (req, res) => {
          if (r.method) {
            await this.fr[r.handler][r.method](req, res);
          }
        });
      }
      return resolve();
    });
  }
}

module.exports = RouterManager;
