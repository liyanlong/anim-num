import {
  isArray
} from '../util/index'

export function callHook (animNum, hook) {
  let handlers = animNum.$options[hook]
  if (handlers) {
    handlers = isArray(handlers) ? handlers : [handlers]
    for (let i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(animNum)
      } catch (e) {
        console.error(e, animNum, `${hook} hook`)
      }
    }
  }
}
