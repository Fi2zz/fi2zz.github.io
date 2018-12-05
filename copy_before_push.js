const fs = require("fs-extra");

const path = require("path");
const pwaBuildPath = path.resolve(__dirname, "./pwa/build");
const pwaDistPath = path.resolve(__dirname, "./static/pwa");
const staticPath = path.resolve(__dirname, "./static");

function cleanStaticFolderAndCopyApps(handlers) {
  fs.emptyDirSync(staticPath);
  for (let handler of handlers) {
    handler.apply();
  }
}

function copyPWA() {
  fs.copySync(pwaBuildPath, pwaDistPath, {
    dereference: true
  });
}

cleanStaticFolderAndCopyApps([copyPWA]);
