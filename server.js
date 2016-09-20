if (!process.env.NODE_ENV) {
  require("dotenv").config();
}

const express = require("express");

const port = process.env.PORT || 3333;

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/dist"));
} else {
  console.log("Webpack is loading...")
  const webpack = require("webpack");
  const config = require("./webpack.config");
  const compiler = webpack(config);
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    historyApiFallback: true,
  }));
  app.use(require("webpack-hot-middleware")(compiler));
}

app.use(express.static(__dirname + "/public/"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

if (!module.parent) {
  app.listen(port, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Listening on localhost:${port}`);
    }
  });
}

module.exports = app;
