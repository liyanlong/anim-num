import {
  noop,
  extend
} from './util'

const sharedProperties = {
  enumerable: true,
  configurable: false,
  get: noop,
  set: noop
}

function isConfigurable (obj, name) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, name)
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
export function def (obj, name, props) {
  if (!isConfigurable(obj, name)) {
    return obj
  }
  Object.defineProperty(obj, name, extend(props, sharedProperties))
  return obj
}

export function defGetter (obj, name, getter) {
  if (!isConfigurable(obj, name)) {
    return obj
  }
  Object.defineProperty(obj, name, extend(props, {
    get: getter
  }))
  return obj
}
