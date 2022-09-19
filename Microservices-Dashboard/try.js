var fs = require("fs");
var Config = require("./Configs.json");
var ConfigParams = JSON.parse(fs.readFileSync(__dirname +'/Configs.json').toString());
console.log(Config)
console.log(ConfigParams)