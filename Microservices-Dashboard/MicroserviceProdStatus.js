var aws = require("aws-sdk"); //installed

var fs = require("fs");
var Config = require("./Configs.json");
const Promise = require("bluebird");

aws.config.setPromisesDependency(Promise);

var ConfigParams = JSON.parse(
  fs.readFileSync(__dirname + "/Configs.json").toString()
);

const MicroserviceProdStatus = async (service, credentials) => {
  var ecs = new aws.ECS({
    region: ConfigParams.SourceRegion,
    accessKeyId: credentials.TargetAccessKeyId,
    secretAccessKey: credentials.TargetSecretAccessKey,
    sessionToken: credentials.TargetSessionToken
  });

  var params = {
    cluster: Config["prod"][service]["cluster"],
    services: [Config["prod"][service]["services"]]
  };

  try {
    const data = await ecs.describeServices(params).promise();
    var updatedAt = data.services[0].deployments[0].updatedAt.toISOString();
    updatedAt = updatedAt.replace("T", " ").split(".");
    updatedAt = updatedAt[0];
    return updatedAt;
  } catch (error) {
    console.log(error);
  }
};

module.exports = MicroserviceProdStatus;
