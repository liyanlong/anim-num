import DefaultRenderer from './default'

export const rendererStrategy = {
  default: DefaultRenderer
}

export function RendererFactory(type, ...args) {
  let RendererCotr = rendererStrategy[type] || rendererStrategy['default']
  return new RendererCotr(...args)
}
