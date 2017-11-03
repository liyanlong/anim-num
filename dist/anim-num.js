/*!
 * anim-num.js v0.1.0
 * (c) 2017-2017 liyanlong
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.AnimNum = factory());
}(this, (function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

__$styleInject(".anim-num {\n  font-size: 32px;\n  height: 1.5em;\n  font-family: monospace;\n  box-sizing: border-box;  \n  display: inline-flex;\n  overflow: hidden;\n  align-items: center;\n}\n\n.anim-num__numeric {\n  display: flex;\n  overflow: hidden;\n  border: 1px solid;\n  margin: 0 3px;\n  height: 100%;\n  color: inherit;\n  background: #ffffff;\n  box-sizing: border-box;\n}\n\n.anim-num__signed {\n  margin: 0 3px;  \n}\n.anim-num__separator, .anim-num__decimal{\n  align-self: flex-end;\n}\n\n.anim-num__signed > i, .anim-num__separator > i, .anim-num__decimal > i {\n  font-style: normal;\n}\n\n.anim-num__list {\n  padding: 0 3px;\n  margin: 0;\n  position: relative;\n  font-weight: 400;\n  display: block;\n}\n\n.anim-num__item {\n  list-style: none;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n  display: flex;\n  align-items: center;\n}\n\n/**\n * default render style\n */\n.anim-num__numeric--default {\n  background: #1e2c66;\n  border-radius: 6px;\n  color: #ffffff;\n  padding: 2px;\n}\n",undefined);

const animationEnd = (function () {
  let elStyle = document.createElement('div').style;
  let verdors = ['a', 'webkitA', 'MozA', 'OA', 'msA'];
  let endEvents = ['animationend', 'webkitAnimationEnd', 'animationend', 'oAnimationEnd', 'MSAnimationEnd'];
  let animation;
  for (let i = 0, len = verdors.length; i < len; i++) {
    animation = verdors[i] + 'nimation';
    if (animation in elStyle) {
      return endEvents[i]
    }
  }
  return 'animationend'
})();

const transitionEnd = (function () {
  let elStyle = document.createElement('div').style;
  let verdors = ['t', 'webkitT', 'MozT', 'OT', 'msT'];
  let endEvents = ['transitionend', 'webkitTransitionEnd', 'mozTransitioinEnd', 'oTransitionEnd', 'MSTransitionEnd'];
  let transition;
  for (let i = 0, len = verdors.length; i < len; i++) {
    transition = verdors[i] + 'ransition';
    if (transition in elStyle) {
      return endEvents[i]
    }
  }
  return 'transitionend'
})();

const toString = Object.prototype.toString;
function noop () {}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  // enumerable
  for (const key in _from) {
    if (isUndefined(to[key])) {
      to[key] = _from[key];
    }
  }
  return to
}

/**
 * @param {any} obj 
 * @return {boolean}
 */
function isArray (obj) {
  return toString.call(obj) === '[object Array]'
}

function isPlainObject (obj) {
  return toString.call(obj) === '[object Object]'
}

function isUndefined (obj) {
  return toString.call(obj) === '[object Undefined]'
}

function isError (obj) {
  return toString.call(obj) === '[object Error]'
}

function clone (obj, deep = false) {
  if (!deep) {
    return Object.assign(isArray(obj) ? [] : {}, obj)
  }
  return deepClone(obj)
}

function _deepClone (obj, objStack) {
  let newObj, cloneObj;
  if (isArray(obj) || isPlainObject(obj)) {
    // 对象重复引用
    if (objStack.indexOf(obj) === -1) {
      objStack.push(obj);
    } else {
      return new Error('parameter Error. it is exits loop reference')
    }
  }
  if (isArray(obj)) {
    newObj = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      cloneObj = _deepClone(obj[i], objStack);
      if (!isError(cloneObj)) {
        newObj.push(cloneObj);
      }
    }
  } else if (isPlainObject(obj)) {
    newObj = {};
    for (var key in obj) {
      cloneObj = _deepClone(obj[key], objStack);
      if (!isError(cloneObj)) {
        newObj[key] = cloneObj;
      }
    }
  } else {
    newObj = obj;
  }
  return newObj
}

function deepClone (obj) {
  const objStack = [];
  return _deepClone(obj, objStack)
}

/**
 * 
 * @export
 * @return {array} 
 */




function delay (delayTime) {
  return new Promsie(function (resolve) {
    setTimeout(resolve, delayTime);
  })
}

const sharedProperties = {
  enumerable: true,
  configurable: false,
  get: noop,
  set: noop
};

function isConfigurable (obj, name) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, name);
  if (descriptor && descriptor.configurable === false) {
    return false
  }
  return true
}

/**
 * defineProperty Object
 * 
 * @param {any} obj 
 * @param {any} name 
 * @param {any} props
 * @return {object}
 */
function def (obj, name, props) {
  if (!isConfigurable(obj, name)) {
    return obj
  }
  Object.defineProperty(obj, name, extend(props, sharedProperties));
  return obj
}

function hasClass (el, cls) {
  if (!el || !cls) {
    return false
  } 
  if (Array.isArray(cls)) {
    let results = cls.map(item => hasClass(el, item));
    return results.indexOf(false) === -1
  }
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.')
  }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

function addClass (el, cls) {
  if (!el) return
  var curClass = el.className;
  var classes = Array.isArray(cls) ? cls : (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

function assertError$1 (check, msg) {
  if (check) {
    throw new Error(msg)
  }
}

const _unshift = Array.prototype.unshift;

function unshiftApply (ctx, args) {
  args = isArray(args) ? args : [args];
  return _unshift.apply(ctx, args)
}

function unshift (ctx, ...args) {
  return _unshift.apply(ctx, args)
}

/**
 * @export
 * @param {AnimNum} animNum 
 */
function initState (animNum, oldValue, value) {
  animNum.$value = value;
  animNum.$oldValue = oldValue;
  animNum._diffNums = animNum._oldDiffNums =  [];
  animNum._formatNums = animNum._oldFomartNums = [];
  initNumbers(animNum);
  initFormat(animNum);
}

/**
 * 
 * @export
 * @param {AnimNum} animNum 
 * @param {number} oldValue 
 * @param {number} value 
 */
function updateState (animNum, oldValue, value) {
  animNum.$value = value;
  animNum.$oldValue = oldValue;
  animNum._oldDiffNums = animNum.diffNums();
  animNum._oldFomartNums = animNum.formatNums();
  initNumbers(animNum);
  initFormat(animNum);
}

function initNumbers (animNum) {
  let {value, oldValue, $options} = animNum;
  let decimals = $options.decimals;
  // 去除 - 号
  let oldNums = Math.abs(oldValue).toFixed(decimals).split('.');
  let nums = Math.abs(value).toFixed(decimals).split('.');
  animNum._diffNums = createDiffNumbers(nums, oldNums, $options);
}

function initFormat (animNum) {
  let {separator, decimals, decimal} = animNum.$options;
  let [diffNumbers, diffDecimals] = animNum.diffNums();
  let formatNums = [];
  while(diffNumbers.length > 0) {
    if (diffNumbers.length > 1 && diffNumbers[0]['new'] === 0) {
      diffNumbers.shift();
      continue
    }
    unshiftApply(formatNums, diffNumbers.splice(-3));
    if (diffNumbers.length) {
      unshift(formatNums, separator);
    }
  }
  if (decimals > 0) {
    formatNums.push(decimal);
  }
  diffDecimals.forEach(diffDecimal => {formatNums.push(diffDecimal);});
  animNum._formatNums = formatNums;
}

function createDiffNumbers (nums, oldNums, {decimal}) {
  let diffNums = [[], []];
  let numberArr = nums[0].split('');
  let oldNumberArr = oldNums[0].split('');
  let decimalArr = nums[1] ? nums[1].split('') : [];
  let oldDecimalArr = oldNums[1] ? oldNums[1].split('') : [];

  diffNums[0] = createDiffNumber(numberArr, oldNumberArr);
  diffNums[1] = createDiffNumber(decimalArr, oldDecimalArr);
  return diffNums
}

/**
 * @param {array} arr 
 * @param {any} item 
 * @param {number} len 
 * @return {array}
 */
function unshiftItems (arr, item, len) {
  while (len-- > 0) {
    arr.unshift(item);   
  }
  return arr
}

function createDiffNumber (numberArr, oldNumberArr) {
  unshiftItems(
    numberArr.length > oldNumberArr.length ? oldNumberArr : numberArr,
    0,
    Math.abs(numberArr.length - oldNumberArr.length)
  );
  return numberArr.map((number, index) => {
    return {
      old: +oldNumberArr[index],
      new: +numberArr[index]
    }
  })
}

/**
 * 
 * @export
 * @param {any} value 
 */


function stateMixin (AnimNum) {

  AnimNum.prototype.oldDiffNums = function () {
    return clone(this._oldDiffNums)
  };

  AnimNum.prototype.diffNums = function () {
    return clone(this._diffNums, true)
  };

  AnimNum.prototype.oldFormatNums = function () {
    return clone(this._oldFomartNums)
  };

  AnimNum.prototype.formatNums = function () {
    return clone(this._formatNums)
  };

  AnimNum.prototype.format = function () {

  };
}

/** Create Renderer Class */
class Renderer {

  /**
   * Creates an instance of Renderer.
   * @constructor
   * @param {AnimNum} animNum AnimNum对象
   * @memberof Renderer
   */
  constructor (animNum) {
    let {$el, $options} = animNum;
    animNum.$renderer = this;
    if (!hasClass($el, 'anim-num')) {
      addClass($el, 'anim-num');
    }
    $options['fontSize'] && ($el.style.fontSize = $options['fontSize']);
    this.ctx = animNum;
  }

  /**
   * @abstract
   * @memberof Renderer
   */
  initRender () {
    assertError$1(true, `abstract method [render]. should be inherit`);
  }

  /**
   * 
   * @abstract
   * @memberof Renderer
   */
  updateRender () {
    assertError$1(true, `abstract method [updateRender]. should be inherit`);
  }

   /**
   * 
   * @abstract
   * @memberof Renderer
   * @return {Promise}
   */
  animate () {
    assertError$1(true, `abstract method [animate]. should be inherit`);
  }

}

/**
 * 
 * @param {string} name 
 * @param {any} type 
 * @return {string}
 */
function getClassName(name, type = null) {
  if (type) {
    return `anim-num__${name} anim-num__${name}--${type}`    
  }
  return `anim-num__${name}`
}

function _getClassName (name) {
  return getClassName(name, 'default')
}

class DefaultRenderer extends Renderer {

  initRender () {
    let ctx = this.ctx;
    let {decimal, separator, length, unsigned} = ctx.$options;
    let fragment = document.createDocumentFragment();
    let elements = ctx.formatNums().map((data) => createElement(data, ctx.$options));
    elements.forEach(element => element && fragment.appendChild(element));

    // 有符号情况下, 插入符号
    if (!unsigned) {
      this.$signed = createSigned(ctx.oldValue >= 0 ? '+' : '-');
      fragment.insertBefore(this.$signed, fragment.firstChild);
    }
    ctx.$el.appendChild(fragment);    
  }

  updateRender () {
    let ctx = this.ctx;
    let {$el, oldValue, value, $options} = ctx;
    let oldFormatNums = ctx.oldFormatNums();
    let formatNums = ctx.formatNums();
    let [oldLength, newLength] = [oldFormatNums.length, formatNums.length];

    let clone = $el.cloneNode(true);
    let lessFormatNums = [];
    let doFn = null;
    if (oldLength > newLength) {
      lessFormatNums = oldFormatNums.slice(0, oldLength - newLength);
      doFn = this.delElements;
    } else if (oldLength < newLength) {
      lessFormatNums = formatNums.slice(0, newLength - oldLength);
      doFn = this.addElements;
    }
    console.log(oldLength, newLength, oldFormatNums, formatNums);
    doFn && doFn.call(this, clone, lessFormatNums);

    // replace clone node
    if (!$options['unsigned']) {
      let $signed = clone.querySelector(`.${getClassName('signed')}`);
      $signed.querySelector('i').innerText = value >= 0 ? '+' : '-';
      clone.insertBefore($signed, clone.firstChild);
    }
    $el.parentNode.replaceChild(clone, $el);
    this.ctx.$el = clone;
    $el = null;
  }

  animate (cb) {
    let {ctx}= this;
    let {$el, value} = ctx;
    let listMap = $el.querySelectorAll(`.${getClassName('numeric')} .${getClassName('list')}`);
    let height = $el.querySelector(`.${getClassName('list')}`).offsetHeight;    
    let [diffNumbers, diffDecimals] = ctx.diffNums();
    let translateJobs = [];

    // 消除多余0开头的元素
    while (diffNumbers.length > 0 && diffNumbers[0]['new'] === 0) {
      diffNumbers.shift();
    }

    diffNumbers.concat(diffDecimals).forEach((number, index) => {
      let el = listMap[index];
      let [val, oldVal] = [number['new'], number['old']];
      if(val === oldVal || val !== val || oldVal !== oldVal) {
        return
      }
      if (el) {
        translateJobs.push(createTranslateJob(el, val, - val * height));        
      }
    });
    Promise.all(translateJobs).then(cb).then(() => {
      translateJobs = null;
    });
  }

  delElements (el, lessFormatNums) {
    let {decimal, separator} = this.ctx.$options;
    lessFormatNums.forEach((data) => {
      let className = null;
      if (data === decimal) {
        className = _getClassName('decimal');
      } else if (data === separator) {
        className = _getClassName('separator');
      } else if (isPlainObject(data) && 'old' in data && 'new' in data) {
        className = _getClassName('numeric');
      }
      className && el.removeChild(el.querySelector(`.${className.split(/\s/)[0]}`));
    });
  }

  addElements (el, lessFormatNums) {
    let options = this.ctx.$options;
    let fragment = document.createDocumentFragment();
    lessFormatNums
      .map((data) => createElement(data, options))
      .forEach((element) => {
        fragment.appendChild(element);
      });
    el.insertBefore(
      fragment,
      el.firstChild
    );
  }
}


function createElement (data, {decimal, separator, duration, transitionFn, delay}) {
  if (data === decimal) {
    return createDecimal(decimal)
  } else if (data === separator) {
    return createSeparator(separator)
  } else if (isPlainObject(data) && 'new' in data) {
    return createNumeric(duration, transitionFn, delay)
  }
}

function createTranslateJob (el, number, pixels) {
  return new Promise(function (resolve) {
    let isFinished = false;
    el.addEventListener(transitionEnd, function fn (event) {
      if (!isFinished) {
        el.removeEventListener(transitionEnd, fn);
        resolve(event);
        isFinished = true;        
      }
    });
    el.style.transform = `translateY(${pixels}px)`;
  })
}

function createContainer (name) {
  let container = document.createElement('div');
  container.className = _getClassName(name);
  return container
}

function createMark (name) {
  let i = document.createElement('i');
  i.appendChild(document.createTextNode(name));
  return i
}

function createNumeric (duration, transitionFn, delay) {
  let container = createContainer('numeric');
  let items = document.createElement('ul');
  items.className = _getClassName('list');
  items.style.transition = `transform ${duration}s ${transitionFn} ${delay ? delay + 's' : ''}`;

  for (let i =0; i < 10; i++) {
    let item = document.createElement('li');
    item.className = _getClassName('item');
    item.innerHTML = `<span>${i}</span>`;
    items.appendChild(item);
  }
  container.appendChild(items);
  return container
}

function createSeparator (separator) {
  let container = createContainer('separator');
  let i = createMark(separator); 
  container.appendChild(i);
  return container
}

function createDecimal (decimal) {
  let container = createContainer('decimal');
  let i = createMark(decimal);
  container.appendChild(i);
  return container
}

function createSigned (signed) {
  let container = createContainer('signed');
  let i = createMark(signed);
  container.appendChild(i);
  return container
}

const rendererStrategy = {
  default: DefaultRenderer
};

function RendererFactory(type, ...args) {
  let RendererCotr = rendererStrategy[type] || rendererStrategy['default'];
  return new RendererCotr(...args)
}

function initRender (animNum) {
  let {$options, $el} = animNum;
  const renderer = RendererFactory($options.type, animNum);
  renderer.initRender();
}

function updateRender (animNum) {
  animNum.$renderer.updateRender();
}

function renderMixin (AnimNum) {

  AnimNum.prototype.startAnimation = function () {
    this._isAnimate = true;
    let _resovle;
    let promise = new Promise(function (resolve) {
      _resovle = resolve;
    });
    this.$renderer.animate(() => {
      if (this._nextUpdateFn.length) {
        let cb = this._nextUpdateFn.shift();
        cb && cb();
        _resovle();
      } else {
        this._isAnimate = false;
        _resovle();
      }
    });
    return promise
  };
}

/** 动画组件类 */
class AnimNum$1 {
  /**
   * Create a AnimNum
   * @param {HTMLElment} el - 元素
   * @param {Number} [value=0] - 动画数字初始值
   * @param {Object} [options={}] - 配置项
   */
  constructor (el, value = 0, options = {}) {
    if (typeof el === 'string') {
      el = document.querySelector(el);
    }
    assertError$1(!(el instanceof HTMLElement), `[constructor] error. invalid el in AnimNum constructor`);
    assertError$1(el.$animNum instanceof AnimNum$1, `[constructor] error. el has been used`);
    
    options = extend(options, AnimNum$1.defaults);
    value = options['unsigned'] ? Math.abs(Number(value)) : Number(value);
    assertError$1(isNaN(value), `[constructor] error. invalid value in AnimNum contstrcotr`);

    this.$el = el;
    def(el, '$animNum', {
      get () {return this}
    });
    this.$options = options;
    this.$oldValue = this.$value = 0;
    this._nextUpdateFn = [];
    initState(this, 0, value);
    initRender(this);
    if (options['immediate']) {
      this.start();
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
      this._started = true;
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
    let _resolve;
    let options = this.$options;
    let oldValue = this.$value;
    value = options['unsigned'] === true ? Math.abs(Number(value)) : Number(value);
    assertError$1(isNaN(value), `[update] error. invalid value`);

    let p = new Promise(function (resolve, reject) {
      _resolve = resolve;
    });

    let promise = delayTime > 0
    ? delay(delayTime).then(() => p)
    : p;
    
    function updateFn (animNum, oldValue, value) {
      updateState(animNum, oldValue, value);
      updateRender(animNum);
      animNum.startAnimation().then(_resolve);
    }

    if (this._isAnimate) {
      this._nextUpdateFn.push(() => {
        return updateFn(this, oldValue, value)
      });
    } else {
      updateFn(this, oldValue, value);
    }
    return promise
  }
}

var version = "0.1.0";

// src/main.js
const defineVersionProp = {
  get: function () {
    return version
  }
};

def(AnimNum$1, 'version', defineVersionProp);
stateMixin(AnimNum$1);
renderMixin(AnimNum$1);

/**
 * @static
 * @desc AnimNum 默认配置项
 */
AnimNum$1.defaults = {
  immediate: false, // 立即执行
  fontSize: '14px', //
  unsigned: true, // 无符号
  decimals: 2, // .00  0 - 20
  decimal: '.', // 小数点占位符
  separator: ',', // 分隔符
  duration: 1, // 动画时间
  type: 'default', // render
  transitionFn: 'ease', // linear ease ease-in ease-out ease-in-out cubic-bezier(n,n,n,n)
};

return AnimNum$1;

})));
