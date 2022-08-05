const path = require("path");
module.exports = {
  entry: "./src/index.js", //入口檔案
  output: {
    filename: "main.js", //檔案名稱
    path: path.resolve(__dirname, "dist") //輸出地點
  }
};