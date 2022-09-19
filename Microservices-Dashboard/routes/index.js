const express = require("express");
const router = express.Router();
var serviceUat = require("../MicroserviceStatus.js");
var serviceProd = require("../MicroserviceProdStatus.js");
var assumeRole = require("../AssumeRole.js");
var elbCheck = require("../ELBCheck.js");
var prodElbCheck = require("../ProdELBCheck.js");
var Config = require("../Configs.json");

let services = Object.keys(Config.uat)
let environments=["uat","prod"]

router.get("/", async function (req, res, next) {
  const uatTime = [];
  const prodTime = [];
  const uatlink = [];
  const elbStatus = [];
  const prodlink = [];
  const prodElbStatus = [];

  services.forEach(service => {
    uatTime.push(serviceUat(service));

    uatlink.push(Config["uat"][service]["link"]);
    service != services[3]
      ? elbStatus.push(elbCheck(service))
      : elbStatus.push("N/A");
  });

  const b = await Promise.all(uatTime);
  const c = await Promise.all(elbStatus);

  const cred = await assumeRole(); //prod

  services.forEach(service => {
    prodTime.push(serviceProd(service, cred));
    prodlink.push(Config["prod"][service]["link"]);
    service != services[3]
      ?prodElbStatus.push(prodElbCheck(service, cred))
      : prodElbStatus.push("N/A");
    
  });

  const d = await Promise.all(prodTime);
  const e = await Promise.all(prodElbStatus);

  const result = [];
  const prodresult = [];
  for (let i = 0; i < services.length; i++) {
    result.push({
      updatedTime: b[i],
      elb: c[i],
      serviceName: services[i],
      link: uatlink[i]
    });
    prodresult.push({
      updatedTime: d[i],
      prodelb: e[i],
      prodlink: prodlink[i]
    });
  }

  res.render("index", { title: "Microservices Dashboard", result, prodresult });
});

module.exports = router;
