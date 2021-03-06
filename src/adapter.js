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
        resolve(
          self
            .liquid({
              root: [".", self._source.fullPath]
            })
            .renderFile(path, context)
        );
      } catch (e) {
        reject(new Error(e));
      }
    });
  }
}

module.exports = function(config) {
  return {
    register(source, app) {
      const Liquid = require("liquidjs");
      const adapter = new LiquidAdapter(Liquid, source, app, config);
      adapter.setHandlePrefix(config.handlePrefix);
      return adapter;
    }
  };
};
