var aws = require("aws-sdk"); //installed
var Q = require("q"); //installed
var fs = require("fs");
var Config = require("./Configs.json");
var ConfigUat = fs.readFileSync(__dirname + "/Configs.json"); //synchronous
var ConfigParams = ConfigUat.toString();
ConfigParams = JSON.parse(ConfigParams);

const ELBCheck = async service => {
  var elb = new aws.ELB({
    region: ConfigParams.SourceRegion
  });

  var paramsELB = {
    LoadBalancerName: Config["uat"][service]["ELB"]
  };

  const describeELBPromise = () => {
    return new Promise((resolve, reject) => {
      elb.describeInstanceHealth(paramsELB, (err, dataelb) => {
        if (err) {
          reject(err);
        } else {
          console.log(dataelb);
          var state =
            (dataelb &&
              dataelb.InstanceStates.length &&
              dataelb.InstanceStates[0] &&
              dataelb.InstanceStates[0].State) ||
            "unknown";

          resolve(state);
        }
      });
    });
  };
  try {
    const t = await describeELBPromise();
    return t;
  } catch (error) {
    
    console.log(error);
    return "Unknown"
  }
};

module.exports = ELBCheck;
