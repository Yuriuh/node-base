# module.exports、exports 与 this

## 初始状态

```javascript
console.log(module.exports === exports) // true
console.log(module.exports === this) // true
console.log(exports === this) // true
```

## 非初始状态

```javascript
module.exports = {}

console.log(module.exports === exports) // false
console.log(module.exports === this) // false
console.log(exports === this) // true
```

## 导出风格

```javascript
module.exports {
  a: () => {},
  b: () => {}
}
```

```javascript
export.a = () => {}
export.b = () => {}
```