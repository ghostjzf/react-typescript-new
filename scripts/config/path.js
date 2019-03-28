const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

const alias = {
  components: resolveApp("src/components"),
  utils: resolveApp("src/utils"),
  stores: resolveApp("src/stores"),
  public: resolveApp("public")
};

// module.exports = {
//   dotenv: resolveApp(".env"),
//   appPath: resolveApp("."),
//   appBuild: resolveApp("build"),
//   appPublic: resolveApp("public"),
//   appHtml: resolveApp("public/index.html"),
//   appIndexJs: resolveModule(resolveApp, "src/index"),
//   appPackageJson: resolveApp("package.json"),
//   appSrc: resolveApp("src"),
//   appTsConfig: resolveApp("tsconfig.json"),
//   yarnLockFile: resolveApp("yarn.lock"),
//   testsSetup: resolveModule(resolveApp, "src/setupTests"),
//   proxySetup: resolveApp("src/setupProxy.js"),
//   appNodeModules: resolveApp("node_modules"),
//   publicUrl: getPublicUrl(resolveApp("package.json")),
//   servedPath: getServedPath(resolveApp("package.json"))
// };

module.exports = {
  alias: alias,
  appSrc: resolveApp("src"),
  appTsConfig: resolveApp("tsconfig.json"),
  appNodeModules: resolveApp("node_modules"),
  appDist: resolveApp("dist")
};
