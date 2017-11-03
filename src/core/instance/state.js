import {
  clone,
  unshift,
  unshiftApply
} from '../util/index'


/**
 * @export
 * @param {AnimNum} animNum 
 */
export function initState (animNum, oldValue, value) {
  animNum.$value = value
  animNum.$oldValue = oldValue
  animNum._diffNums = animNum._oldDiffNums =  []
  animNum._formatNums = animNum._oldFomartNums = []
  initNumbers(animNum)
  initFormat(animNum)
}

/**
 * 
 * @export
 * @param {AnimNum} animNum 
 * @param {number} oldValue 
 * @param {number} value 
 */
export function updateState (animNum, oldValue, value) {
  animNum.$value = value
  animNum.$oldValue = oldValue
  animNum._oldDiffNums = animNum.diffNums()
  animNum._oldFomartNums = animNum.formatNums()
  initNumbers(animNum)
  initFormat(animNum)
}

function initNumbers (animNum) {
  let {value, oldValue, $options} = animNum
  let decimals = $options.decimals
  // 去除 - 号
  let oldNums = Math.abs(oldValue).toFixed(decimals).split('.')
  let nums = Math.abs(value).toFixed(decimals).split('.')
  animNum._diffNums = createDiffNumbers(nums, oldNums, $options)
}

function initFormat (animNum) {
  let {value} = animNum
  let {separator, decimals, decimal} = animNum.$options
  let [diffNumbers, diffDecimals] = animNum.diffNums()
  let formatNums = []
  while(diffNumbers.length > 0) {
    if (diffNumbers.length > 1 && diffNumbers[0]['new'] === 0) {
      diffNumbers.shift()
      continue
    }
    unshiftApply(formatNums, diffNumbers.splice(-3))
    if (diffNumbers.length) {
      unshift(formatNums, separator)
    }
  }
  if (decimals > 0) {
    formatNums.push(decimal)
  }
  diffDecimals.forEach(diffDecimal => {formatNums.push(diffDecimal)})
  animNum._formatNums = formatNums
}

function createDiffNumbers (nums, oldNums, {decimal}) {
  let diffNums = [[], []]
  let numberArr = nums[0].split('')
  let oldNumberArr = oldNums[0].split('')
  let decimalArr = nums[1] ? nums[1].split('') : []
  let oldDecimalArr = oldNums[1] ? oldNums[1].split('') : []

  diffNums[0] = createDiffNumber(numberArr, oldNumberArr)
  diffNums[1] = createDiffNumber(decimalArr, oldDecimalArr)
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
    arr.unshift(item)   
  }
  return arr
}

function createDiffNumber (numberArr, oldNumberArr) {
  unshiftItems(
    numberArr.length > oldNumberArr.length ? oldNumberArr : numberArr,
    0,
    Math.abs(numberArr.length - oldNumberArr.length)
  )
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
export function formatNumber (value, {decimals, unsigned}) {
  value = unsigned ? Math.abs(Number(value)) : Number(value)
  assertError(isNaN(value), `[constructor] error. invalid value in AnimNum contstrcotr`)
  // if (decimals > 0) {
  // }
}

export function stateMixin (AnimNum) {

  AnimNum.prototype.oldDiffNums = function () {
    return clone(this._oldDiffNums)
  }

  AnimNum.prototype.diffNums = function () {
    return clone(this._diffNums, true)
  }

  AnimNum.prototype.oldFormatNums = function () {
    return clone(this._oldFomartNums)
  }

  AnimNum.prototype.formatNums = function () {
    return clone(this._formatNums)
  }

  AnimNum.prototype.format = function () {

  }
}
