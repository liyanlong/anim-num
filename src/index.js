// src/main.js
import styleCss from './styles/main.css'
import AnimNum from './core/instance/index'
import { version } from '../package.json'
import {
  def
} from './core/util/index'

import {stateMixin} from './core/instance/state'
import {renderMixin} from './core/instance/render'

const defineVersionProp = {
  get: function () {
    return version
  }
}

def(AnimNum, 'version', defineVersionProp)
stateMixin(AnimNum)
renderMixin(AnimNum)

/**
 * @static
 * @desc AnimNum 默认配置项
 */
AnimNum.defaults = {
  immediate: false, // 立即执行
  fontSize: '14px', //
  unsigned: true, // 无符号
  decimals: 2, // .00  0 - 20
  decimal: '.', // 小数点占位符
  separator: ',', // 分隔符
  duration: 1, // 动画时间
  type: 'default', // render
  transitionFn: 'ease', // linear ease ease-in ease-out ease-in-out cubic-bezier(n,n,n,n)
}

export default AnimNum
