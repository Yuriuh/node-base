```javascript
function require(modulePath) {
  // 1. 将 modulePath 转换为绝对路径 D:\Projects\node-base\src\模块化\require函数

  // 2. 判断是否该模块已有缓存 require.cache[绝对路径]
  if (require.cache[绝对路径]) {
    return require.cache[绝对路径]
  }
  // 3. 读取文件内容

  // 4. 包裹到一个函数中 wrap
  function wrap(module, exports, require, __dirname, __filename) {
    exports.c = 3
    module.exports = {
      a: 1,
      b: 2
    }
    this.d = 4
  }
  // 5. 创建 module 对象

  // 6. 调用函数
  module.exports = {}
  const exports = module.exports
  wrap.call(module.exports, module, exports, require, module.path, module.filename)
}
```