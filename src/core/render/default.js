import Renderer, {getClassName} from './base'

import {
  isArray,
  isPlainObject,  
  transitionEnd,
  removeClass,
  addClass
} from '../util/index'

function _getClassName (name) {
  return getClassName(name, 'default')
}

export default class DefaultRenderer extends Renderer {

  initRender () {
    let ctx = this.ctx
    let {decimal, separator, length, unsigned} = ctx.$options
    let fragment = document.createDocumentFragment()
    let elements = ctx.formatNums().map((data) => createElement(data, ctx.$options))
    elements.forEach(element => element && fragment.appendChild(element))

    // 有符号情况下, 插入符号
    if (!unsigned) {
      this.$signed = createSigned(ctx.oldValue >= 0 ? '+' : '-')
      fragment.insertBefore(this.$signed, fragment.firstChild)
    }
    ctx.$el.appendChild(fragment)    
  }

  updateRender () {
    let ctx = this.ctx
    let {$el, oldValue, value, $options} = ctx
    let oldFormatNums = ctx.oldFormatNums()
    let formatNums = ctx.formatNums()
    let [oldLength, newLength] = [oldFormatNums.length, formatNums.length]

    let clone = $el.cloneNode(true)
    let lessFormatNums = []
    let doFn = null
    if (oldLength > newLength) {
      lessFormatNums = oldFormatNums.slice(0, oldLength - newLength)
      doFn = this.delElements
    } else if (oldLength < newLength) {
      lessFormatNums = formatNums.slice(0, newLength - oldLength)
      doFn = this.addElements
    }
    console.log(oldLength, newLength, oldFormatNums, formatNums)
    doFn && doFn.call(this, clone, lessFormatNums)

    // replace clone node
    if (!$options['unsigned']) {
      let $signed = clone.querySelector(`.${getClassName('signed')}`)
      $signed.querySelector('i').innerText = value >= 0 ? '+' : '-'
      clone.insertBefore($signed, clone.firstChild)
    }
    $el.parentNode.replaceChild(clone, $el)
    this.ctx.$el = clone
    $el = null
  }

  animate (cb) {
    let {ctx}= this
    let {$el, value} = ctx
    let listMap = $el.querySelectorAll(`.${getClassName('numeric')} .${getClassName('list')}`)
    let height = $el.querySelector(`.${getClassName('list')}`).offsetHeight    
    let [diffNumbers, diffDecimals] = ctx.diffNums()
    let translateJobs = []

    // 消除多余0开头的元素
    while (diffNumbers.length > 0 && diffNumbers[0]['new'] === 0) {
      diffNumbers.shift()
    }

    diffNumbers.concat(diffDecimals).forEach((number, index) => {
      let el = listMap[index]
      let [val, oldVal] = [number['new'], number['old']]
      if(val === oldVal || val !== val || oldVal !== oldVal) {
        return
      }
      if (el) {
        translateJobs.push(createTranslateJob(el, val, - val * height))        
      }
    })
    Promise.all(translateJobs).then(cb).then(() => {
      translateJobs = null
    })
  }

  delElements (el, lessFormatNums) {
    let {decimal, separator} = this.ctx.$options
    lessFormatNums.forEach((data) => {
      let className = null
      if (data === decimal) {
        className = _getClassName('decimal')
      } else if (data === separator) {
        className = _getClassName('separator')
      } else if (isPlainObject(data) && 'old' in data && 'new' in data) {
        className = _getClassName('numeric')
      }
      className && el.removeChild(el.querySelector(`.${className.split(/\s/)[0]}`))
    })
  }

  addElements (el, lessFormatNums) {
    let options = this.ctx.$options
    let fragment = document.createDocumentFragment()
    lessFormatNums
      .map((data) => createElement(data, options))
      .forEach((element) => {
        fragment.appendChild(element)
      })
    el.insertBefore(
      fragment,
      el.firstChild
    )
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
    let isFinished = false
    el.addEventListener(transitionEnd, function fn (event) {
      if (!isFinished) {
        el.removeEventListener(transitionEnd, fn)
        resolve(event)
        isFinished = true        
      }
    })
    el.style.transform = `translateY(${pixels}px)`
  })
}

function createContainer (name) {
  let container = document.createElement('div')
  container.className = _getClassName(name)
  return container
}

function createMark (name) {
  let i = document.createElement('i')
  i.appendChild(document.createTextNode(name))
  return i
}

function createNumeric (duration, transitionFn, delay) {
  let container = createContainer('numeric')
  let items = document.createElement('ul')
  items.className = _getClassName('list')
  items.style.transition = `transform ${duration}s ${transitionFn} ${delay ? delay + 's' : ''}`

  for (let i =0; i < 10; i++) {
    let item = document.createElement('li')
    item.className = _getClassName('item')
    item.innerHTML = `<span>${i}</span>`
    items.appendChild(item)
  }
  container.appendChild(items)
  return container
}

function createSeparator (separator) {
  let container = createContainer('separator')
  let i = createMark(separator) 
  container.appendChild(i)
  return container
}

function createDecimal (decimal) {
  let container = createContainer('decimal')
  let i = createMark(decimal)
  container.appendChild(i)
  return container
}

function createSigned (signed) {
  let container = createContainer('signed')
  let i = createMark(signed)
  container.appendChild(i)
  return container
}

