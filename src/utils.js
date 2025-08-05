export const throttle = function(fn, to) {
  let timer

  return function throttleInner() {
    if (timer) {
      return
    }

    timer = setTimeout(() => {
      fn.apply(null, arguments)
      timer = null
    }, to)
  }
}