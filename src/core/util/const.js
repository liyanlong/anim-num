
export const animationEnd = (function () {
  let elStyle = document.createElement('div').style
  let verdors = ['a', 'webkitA', 'MozA', 'OA', 'msA']
  let endEvents = ['animationend', 'webkitAnimationEnd', 'animationend', 'oAnimationEnd', 'MSAnimationEnd']
  let animation
  for (let i = 0, len = verdors.length; i < len; i++) {
    animation = verdors[i] + 'nimation'
    if (animation in elStyle) {
      return endEvents[i]
    }
  }
  return 'animationend'
})()

export const transitionEnd = (function () {
  let elStyle = document.createElement('div').style
  let verdors = ['t', 'webkitT', 'MozT', 'OT', 'msT']
  let endEvents = ['transitionend', 'webkitTransitionEnd', 'mozTransitioinEnd', 'oTransitionEnd', 'MSTransitionEnd']
  let transition
  for (let i = 0, len = verdors.length; i < len; i++) {
    transition = verdors[i] + 'ransition'
    if (transition in elStyle) {
      return endEvents[i]
    }
  }
  return 'transitionend'
})()
