var aws = require("aws-sdk"); //installed
var Q = require("q"); //installed
var fs = require("fs");
var Config = require("./Configs.json");
var ConfigUat = fs.readFileSync(__dirname + "/Configs.json"); //synchronous
var ConfigParams = ConfigUat.toString();
ConfigParams = JSON.parse(ConfigParams);

const AssumeRole = async () => {
  var sts = new aws.STS({
    region: ConfigParams.SourceRegion
  });
  var paramsSTS = {
    DurationSeconds: "3600",
    RoleArn: Config.ProdRoleArn,
    RoleSessionName: "RoleSession"
  };

  const assumeroleARN = () => {
    return new Promise((resolve, reject) => {
      sts.assumeRole(paramsSTS, function (err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          // console.log(JSON.stringify(data));
          var obj = new Object();
          obj.TargetAccessKeyId = data.Credentials.AccessKeyId;
          obj.TargetSecretAccessKey = data.Credentials.SecretAccessKey;
          obj.TargetSessionToken = data.Credentials.SessionToken;
          resolve(obj);
        }
      });
    });
  };
  const credentials = await assumeroleARN();
  return credentials;
};
module.exports = AssumeRole;
