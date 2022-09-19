var aws = require("aws-sdk"); //installed
var Q = require("q"); //installed
var fs = require("fs");
var Config = require("./Configs.json");
var ConfigUat = fs.readFileSync(__dirname + "/Configs.json"); //synchronouse
var ConfigParams = ConfigUat.toString();
ConfigParams = JSON.parse(ConfigParams);

const ProdELBCheck = async (service, credentials) => {
  var elb = new aws.ELB({
    region: ConfigParams.SourceRegion,
    accessKeyId: credentials.TargetAccessKeyId,
    secretAccessKey: credentials.TargetSecretAccessKey,
    sessionToken: credentials.TargetSessionToken
  });

  var paramsELB = {
    LoadBalancerName: Config["prod"][service]["ELB"]
  };

  const describeELBPromise = () => {
    return new Promise((resolve, reject) => {
      elb.describeInstanceHealth(paramsELB, (err, dataelb) => {
        if (err) {
          reject(err);
        } else {
          var state =
            dataelb &&
            dataelb.InstanceStates[0] &&
            dataelb.InstanceStates[0].State;

          if (state) {
            resolve(state);
          } else {
            resolve("Restarting");
          }
        }
      });
    });
  };
  try {
    const t = await describeELBPromise();
    return t;
  } catch (error) {
    console.log(error);
  }
};

module.exports = ProdELBCheck;
