// script for setting up the dist folder for the React app, before webpack adds bundle.js

var fs = require("fs-extra");

fs.emptyDirSync(__dirname + "/dist");
fs.copySync(__dirname + "/src/app/index.html", __dirname + "/dist/index.html");
