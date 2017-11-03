import {
  hasClass,
  addClass,
  assertError
} from '../util/index'

/** Create Renderer Class */
class Renderer {

  /**
   * Creates an instance of Renderer.
   * @constructor
   * @param {AnimNum} animNum AnimNum对象
   * @memberof Renderer
   */
  constructor (animNum) {
    let {$el, $options} = animNum
    animNum.$renderer = this
    if (!hasClass($el, 'anim-num')) {
      addClass($el, 'anim-num')
    }
    $options['fontSize'] && ($el.style.fontSize = $options['fontSize'])
    this.ctx = animNum
  }

  /**
   * @abstract
   * @memberof Renderer
   */
  initRender () {
    assertError(true, `abstract method [render]. should be inherit`)
  }

  /**
   * 
   * @abstract
   * @memberof Renderer
   */
  updateRender () {
    assertError(true, `abstract method [updateRender]. should be inherit`)
  }

   /**
   * 
   * @abstract
   * @memberof Renderer
   * @return {Promise}
   */
  animate () {
    assertError(true, `abstract method [animate]. should be inherit`)
  }

}

export default Renderer

/**
 * 
 * @param {string} name 
 * @param {any} type 
 * @return {string}
 */
export function getClassName(name, type = null) {
  if (type) {
    return `anim-num__${name} anim-num__${name}--${type}`    
  }
  return `anim-num__${name}`
}
