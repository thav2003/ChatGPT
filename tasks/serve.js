const concurrently = require("concurrently");
const path = require("path");
const logger = require("../logger.js");
const runTask = require("./run");

function createStartCommand(packageManager, name, pathName) {
  const pmRun =
    packageManager === "npm" ? `${packageManager} run` : packageManager;
  const command = `${packageManager} install && ${pmRun} serve`;
  return { command, name, cwd: path.resolve(__dirname, `${pathName}`) };
}

runTask((packageManager) => {
  logger.info(`******* Run script with ${packageManager} ********`);

  const commands = [
    {
      command: `${packageManager} install && ${packageManager} start`,
      name: "assets-server",
      cwd: path.resolve(__dirname, "../share/assets"),
    },
    createStartCommand(packageManager, "app-shell", "../app-shell"),
    createStartCommand(packageManager, "angular-app", "../angular-app"),
    createStartCommand(packageManager, "vue-app", "../vue-app"),
  ];

  const { result } = concurrently(commands, {
    successCondition: "first",
    hide: true,
  });
  result.then(
    () => logger.success("******* Start all projects successed *******"),
    (err) => console.error(err)
  );
});
