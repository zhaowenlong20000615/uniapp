(function () {
  // at方法的兼容函数
  if (!Array.prototype.at) {
    Array.prototype.at = function (index) {
      // 处理负数索引
      index = index >= 0 ? index : this.length + index;

      // 检查索引是否越界
      if (index < 0 || index >= this.length) {
        return undefined;
      }

      return this[index];
    };
  }
})();
