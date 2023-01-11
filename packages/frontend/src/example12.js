const addAll = function () {
  console.log("进行了一次计算");
  let result = 0;
  const len = arguments.length;
  for (let i = 0; i < len; i++) {
    result += arguments[i];
  }
  return result;
};

const proxyAddAll = (function () {
  const resultCache = {};
  return function () {
    // 将入参转化未一个唯一的入参字符串
    const args = Array.prototype.join.call(arguments, ",");

    // 检查本次入参是否有对应的计算结果
    if (args in resultCache) {
      // 如果缓存里面有结果，则返回
      return resultCache[args];
    }

    return (resultCache[args] = addAll(...arguments));
  };
})();

const result1 = proxyAddAll(1, 2, 3, 4);
const result2 = proxyAddAll(1, 2, 3, 4);

console.log(result1, result2);
