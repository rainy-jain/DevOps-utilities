var aws = require("aws-sdk");
var Q = require("q");
var fs = require("fs");
var Config = require("./Configs.json");
var ConfigUat = fs.readFileSync(__dirname + "/Configs.json"); //synchronous
var ConfigParams = ConfigUat.toString();
ConfigParams = JSON.parse(ConfigParams);

const MicroserviceStatus = async service => {
  var ecs = new aws.ECS({
    region: ConfigParams.SourceRegion
  });

  var params = {
    cluster: Config["uat"][service]["cluster"],
    services: [Config["uat"][service]["services"]]
  };

  const describeServicesPromise = () => {
    return new Promise((resolve, reject) => {
      ecs.describeServices(params, (error, data) => {
        var updatedAt = data.services[0].deployments[0].updatedAt.toISOString();
        updatedAt = updatedAt.replace("T", " ").split(".");
        updatedAt = updatedAt[0];

        resolve(updatedAt);
      });
    });
  };
  const a = await describeServicesPromise();
  return a;
};

module.exports = MicroserviceStatus;
