
# Anim-Num
> 全称: animate-number, 具有动画能力的数字. <small>默认采用 transform + transition 过渡动画</small>

## 动画队列
当前动画未结束时, 执行了 `update()` 后, 会将变化的值存入一个动画队列, 同时返回
`Promise` 对象, 可以用来对指定的`update()`动画结束后的操作.
