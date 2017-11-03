
import {
  extend,
  delay,
  assertError,
  clone,
  def
} from '../util/index'

import {initState, updateState} from './state'
import {initRender, updateRender} from './render'

/** 动画组件类 */
class AnimNum {
  /**
   * Create a AnimNum
   * @param {HTMLElment} el - 元素
   * @param {Number} [value=0] - 动画数字初始值
   * @param {Object} [options={}] - 配置项
   */
  constructor (el, value = 0, options = {}) {
    if (typeof el === 'string') {
      el = document.querySelector(el)
    }
    assertError(!(el instanceof HTMLElement), `[constructor] error. invalid el in AnimNum constructor`)
    assertError(el.$animNum instanceof AnimNum, `[constructor] error. el has been used`)
    
    options = extend(options, AnimNum.defaults)
    value = options['unsigned'] ? Math.abs(Number(value)) : Number(value)
    assertError(isNaN(value), `[constructor] error. invalid value in AnimNum contstrcotr`)

    this.$el = el
    def(el, '$animNum', {
      get () {return this}
    })
    this.$options = options
    this.$oldValue = this.$value = 0
    this._nextUpdateFn = []
    initState(this, 0, value)
    initRender(this)
    if (options['immediate']) {
      this.start()
    }
  }

  get oldValue () {
    return this.$oldValue
  }

  get value () {
    return this.$value
  }

  get decimals () {
    return this.$decimals
  }

  /**
   * @readonly
   * @memberof AnimNum
   * @desc 配置参数
   */
  get options () {
    return clone(this.$options)
  }

  /**
   * @param {Number} [delayTime=0] 延时触发时间
   * @return {Promise} 
   * @memberof AnimNum
   */
  start (delayTime = 0) {
    if (!this._started) {
      this._started = true
    } else {
      return Promise.resolve()
    }
    if (delayTime > 0) {
      return delay(delayTime).then(() => {
        return this.startAnimation()
      })
    }
    return this.startAnimation()
  }

  /**
   * @param {Number} value 更新数值
   * @param {Number} [delayTime=0] 延时触发时间
   * @memberof AnimNum
   * @return {Promise}
   */
  update (value, delayTime) {
    let _resolve
    let options = this.$options
    let oldValue = this.$value
    value = options['unsigned'] === true ? Math.abs(Number(value)) : Number(value)
    assertError(isNaN(value), `[update] error. invalid value`)

    let p = new Promise(function (resolve, reject) {
      _resolve = resolve
    })

    let promise = delayTime > 0
    ? delay(delayTime).then(() => p)
    : p
    
    function updateFn (animNum, oldValue, value) {
      updateState(animNum, oldValue, value)
      updateRender(animNum)
      animNum.startAnimation().then(_resolve)
    }

    if (this._isAnimate) {
      this._nextUpdateFn.push(() => {
        return updateFn(this, oldValue, value)
      })
    } else {
      updateFn(this, oldValue, value)
    }
    return promise
  }
}

export default AnimNum
