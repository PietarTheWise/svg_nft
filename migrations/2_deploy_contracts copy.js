const SVGNFT = artifacts.require("SVGNFT");

module.exports = function (deployer) {
  deployer.deploy(SVGNFT);
};
