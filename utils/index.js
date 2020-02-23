/**
 * 工具类整合类
 */
const coreUtil = require("./CoreUtil.js");

const dateUtil = require("./DateUtil.js");

const desUtil = require("./DesUtil.js");

const stringUtil = require("./StringUtil.js");

module.exports = {
  core: coreUtil,
  date: dateUtil,
  des:desUtil,
  string:stringUtil
};