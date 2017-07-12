const Fractal = require("@frctl/fractal");
const Path = require("path");

class LiquidAdapter extends Fractal.Adapter {
  constructor(Liquid, source, app, config) {
    super(Liquid, source);
    this._app = app;
    this._config = config;

    let self = this;
  }

  get liquid() {
    return this._engine;
  }

  render(path, str, context, meta) {
    let self = this;

    meta = meta || {};

    return new Promise(function(resolve, reject) {
      let tplPath = Path.relative(self._source.fullPath, path);

      try {
        //let template = self.engine.liquid
        resolve(self.liquid().renderFile(path, { foo: "baar" }));
      } catch (e) {
        reject(new Error(e));
      }
    });
  }
}

module.exports = function(config) {
  return {
    register(source, app) {
      const Liquid = require("shopify-liquid");
      const engine = Liquid();
      const adapter = new LiquidAdapter(Liquid, source, app, config);

      adapter.setHandlePrefix(config.handlePrefix);

      return adapter;
    }
  };
};
