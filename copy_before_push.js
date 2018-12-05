const fs = require("fs-extra");

const path = require("path");
const pwaBuildPath = path.resolve(__dirname, "./pwa/build");
const staticPath = path.resolve(__dirname, "./static/pwa");
if (fs.existsSync(pwaBuildPath)) {
  fs.copySync(pwaBuildPath, staticPath, {
    dereference: true
  });
}
