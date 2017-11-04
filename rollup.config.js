/**
 * rollup config
 */
const json = require('rollup-plugin-json')
const postcss = require('rollup-plugin-postcss')

const path = require('path')
const version = process.env.VERSION || require('./package.json').version

const resolve = p => {
  return path.resolve(__dirname, './', p)
}

const banner =
'/*!\n' +
' * anim-num.js v' + version + '\n' +
' * (c) 2017-' + new Date().getFullYear() + ' liyanlong\n' +
' * Released under the MIT License.\n' +
' */'

export default {
  input: resolve('src/index.js'),
  output: {
    banner,    
    file: resolve('dist/anim-num.js'),
    format: 'umd',
    name: 'AnimNum'
  },
  plugins: [
    json(),
    postcss({
      extensions: ['.css']
    })
  ],
  watch: {
    exclude: 'node_modules/**'
  }
}