if (!process.env.NODE_ENV) {
  require("dotenv").config();
}

const path = require("path");
const express = require("express");

const port = process.env.PORT || 8080;

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/dist"));
  if (!module.parent) {
    app.listen(port, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Listening on localhost:${port}`);
      }
    });
  }
} else {
  const webpack = require("webpack");
  const WebpackDevServer = require('webpack-dev-server');
  const config = require("./webpack.config");
  // const compiler = webpack(config);
  // app.use(require("webpack-dev-middleware")(compiler, {
  //   noInfo: true,
  // }));
  // app.use(require("webpack-hot-middleware")(compiler));
  console.log("Webpack is loading...")
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
  }).listen(3000, 'localhost', function (err, result) {
    if (err) {
      return console.log(err);
    }

    console.log('Listening at http://localhost:3000/');
  });
}

app.use(express.static(__dirname + "/public/"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

module.exports = app;
