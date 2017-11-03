<script src="https://raw.githubusercontent.com/liyanlong/anim-num/master/dist/anim-num.js"></script>

# Anim-Num
> 全称: animate-number, 具有动画能力的数字. <small>默认采用 transform + transition 过渡动画</small>

## 动画队列
当前动画未结束时, 执行了 `update()` 后, 会将变化的值存入一个动画队列, 同时返回
`Promise` 对象, 可以用来对指定的`update()`动画结束后的操作.

## Example

### 有符号数字变化
```html
<div id="demo"></div>
<script>
  var animNum = new AnimNum('#demo', 500, {
    unsigned: false
  });
  animNum.start().then(() => 
    animNum.update(1000)
  ).then(() => {
    animNum.update(-9999)
  });
</script>
```

<div id="demo"></div>
<script>
  var animNum = new AnimNum('#demo', 500, {
    unsigned: false
  });
  animNum.start().then(() => 
    animNum.update(1000)
  ).then(() => {
    animNum.update(-9999)
  });
</script>

### 无符号数字变化
```html
<div id="demo"></div>
<script>
  var animNum = new AnimNum('#demo', 500, {
    unsigned: false
  });
  animNum.start().then(() => 
    animNum.update(1000)
  ).then(() => {
    animNum.update(-9999)
  });
</script>
```

<div id="demo2"></div>
<script>
  var animNum2 = new AnimNum('#demo2', 500);
  animNum2.start().then(() => 
    animNum2.update(1000)
  ).then(() => {
    animNum2.update(-9999)
  });
</script>

### 整数类型

```html
<div id="demo3"></div>
<script>
  var animNum3 = new AnimNum('#demo3', 500, {
    decimals: 0
  });
  animNum3.start().then(() => 
    animNum3.update(1000)
  ).then(() => {
    animNum3.update(-9999)
  });
</script>
```

<div id="demo3"></div>
<script>
  var animNum3 = new AnimNum('#demo3', 500, {
    decimals: 0
  });
  animNum3.start().then(() => 
    animNum3.update(1000)
  ).then(() => {
    animNum3.update(-9999)
  });
</script>

### 手动执行

```html
<div id="demo4"></div>
<button id="btn">start</button>
<script>
  var animNum4 = new AnimNum('#demo4', 500);
  document.querySelector('#btn').addEventListener('click', function () {
    animNum4.start()
  })
</script>
```

<div id="demo4"></div>
<button id="btn">start</button>
<script>
  var animNum4 = new AnimNum('#demo4', 500);
  document.querySelector('#btn').addEventListener('click', function () {
    animNum4.start()
  })
</script>
