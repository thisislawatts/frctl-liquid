# Liquid Adapter

An adapter to let you use [Shopify Liquid]() templates with [Fractal](http://github.com/frctl/fractal).

Getting Started
---

`npm install frctl-liquid`

Example Configuration

```js
"use strict";

const fractal = (module.exports = require("@frctl/fractal").create());

fractal.set("project.title", "Hello World");

fractal.components.engine(require("frctl-liquid"));
fractal.components.set("ext", ".liquid");
fractal.components.set("path", `${__dirname}/components`);

fractal.docs.set("path", `${__dirname}/docs`);
```
