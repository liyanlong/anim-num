

const toString = Object.prototype.toString
const slice = Array.prototype.slice

export function noop () {}

/**
 * Mix properties into target object.
 */
export function extend (to, _from) {
  // enumerable
  for (const key in _from) {
    if (isUndefined(to[key])) {
      to[key] = _from[key]
    }
  }
  return to
}

/**
 * @param {any} obj 
 * @return {boolean}
 */
export function isArray (obj) {
  return toString.call(obj) === '[object Array]'
}

export function isPlainObject (obj) {
  return toString.call(obj) === '[object Object]'
}

export function isUndefined (obj) {
  return toString.call(obj) === '[object Undefined]'
}

export function isError (obj) {
  return toString.call(obj) === '[object Error]'
}

export function clone (obj, deep = false) {
  if (!deep) {
    return Object.assign(isArray(obj) ? [] : {}, obj)
  }
  return deepClone(obj)
}

function _deepClone (obj, objStack) {
  let newObj, cloneObj
  if (isArray(obj) || isPlainObject(obj)) {
    // 对象重复引用
    if (objStack.indexOf(obj) === -1) {
      objStack.push(obj)
    } else {
      return new Error('parameter Error. it is exits loop reference')
    }
  }
  if (isArray(obj)) {
    newObj = []
    for (var i = 0, len = obj.length; i < len; i++) {
      cloneObj = _deepClone(obj[i], objStack)
      if (!isError(cloneObj)) {
        newObj.push(cloneObj)
      }
    }
  } else if (isPlainObject(obj)) {
    newObj = {}
    for (var key in obj) {
      cloneObj = _deepClone(obj[key], objStack)
      if (!isError(cloneObj)) {
        newObj[key] = cloneObj
      }
    }
  } else {
    newObj = obj
  }
  return newObj
}

export function deepClone (obj) {
  const objStack = []
  return _deepClone(obj, objStack)
}

/**
 * 
 * @export
 * @return {array} 
 */
export function union () {
  let args = slice.call(arguments, 0)
  let ret = []
  if (args.length === 0) {
    return ret
  }
  for (let i = 0, len = args.length; i < len; i++) {
    let item = args[i]
    if (isArray(item)) {
      item.forEach(function (val) {
        ret.indexOf(val) === -1 && ret.push(val)
      })
    } else {
      ret.indexOf(item) === -1 && ret.push(item)
    }
  }
  return ret
}

export function trim (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export function delay (delayTime) {
  return new Promsie(function (resolve) {
    setTimeout(resolve, delayTime)
  })
}
