import {
  isArray
} from './util'

const _unshift = Array.prototype.unshift

export function unshiftApply (ctx, args) {
  args = isArray(args) ? args : [args]
  return _unshift.apply(ctx, args)
}

export function unshift (ctx, ...args) {
  return _unshift.apply(ctx, args)
}
