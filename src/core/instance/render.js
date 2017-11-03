import {RendererFactory} from '../render/index'

export function initRender (animNum) {
  let {$options, $el} = animNum
  const renderer = RendererFactory($options.type, animNum)
  renderer.initRender()
}

export function updateRender (animNum) {
  animNum.$renderer.updateRender()
}

export function renderMixin (AnimNum) {

  AnimNum.prototype.startAnimation = function () {
    this._isAnimate = true
    let _resovle
    let promise = new Promise(function (resolve) {
      _resovle = resolve
    })
    this.$renderer.animate(() => {
      if (this._nextUpdateFn.length) {
        let cb = this._nextUpdateFn.shift()
        cb && cb()
        _resovle()
      } else {
        this._isAnimate = false
        _resovle()
      }
    })
    return promise
  }
}
