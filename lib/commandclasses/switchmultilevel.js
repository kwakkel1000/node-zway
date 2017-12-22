var generic = require('./generic');

const CLASS_NAME = 'SwitchMultilevel';
const CLASS_ID = require('./ids')[CLASS_NAME];

exports.id = CLASS_ID;
exports.name = CLASS_NAME;

exports.create = function (deviceApi, deviceId) {
  var result = generic.create(CLASS_ID, deviceApi, deviceId);

  result.refresh = function () {
    deviceApi.runCommand(deviceId, CLASS_ID, 'Get()');
  };

  result.set = function (level) {
    deviceApi.runCommand(deviceId, CLASS_ID, 'Set(' + level + ')');
  };

  result.activate = function () {
    deviceApi.runCommand(deviceId, CLASS_ID, 'Set(255)');
  };

  result.deactivate = function () {
    deviceApi.runCommand(deviceId, CLASS_ID, 'Set(0)');
  };

  result.toggle = function () {
    var current = deviceApi.getDeviceInfo(deviceId, CLASS_ID).level;
    var newLevel = current === 0 ? 255 : 0;
    deviceApi.runCommand(deviceId, CLASS_ID, 'Set('+newLevel+')');
  };

  return result;
};
