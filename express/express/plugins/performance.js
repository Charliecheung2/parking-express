module.exports = (app) => {
  var osu = require("node-os-utils");
  var cpu = osu.cpu;
  setInterval(() => {
    cpu.usage().then((cpuPercentage) => {
      // console.log(cpuPercentage); // 10.38
    });
  }, 3000);
};
