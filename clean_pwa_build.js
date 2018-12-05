const fs = require("fs-extra");
const path = require("path");
const pwaBuildPath = path.resolve(__dirname, "./pwa/build");
fs.emptyDirSync(pwaBuildPath);
