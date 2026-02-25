function MathTools() {
  /// 计算百分比
  this.getPercent = function (num, total) {
    return num != 0 ? (Math.round(num / total * 10000) / 100.00 + "%") : "0%";
  };
}
module.exports = MathTools;


const mathToolss = new MathTools()
console.log(mathToolss.getPercent(3, 9));
console.log(mathToolss.getPercent(0, 9));