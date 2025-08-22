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

export const debounce = function(fn, to) {
  let timer

  return function debounceInner() {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(null, arguments)
      timer = null
    }, to)
  }
}

export const generateHeadingId = (heading) => {
  return heading.toLowerCase().replaceAll(' ', '-').replace(/[.()]/g, '')
}

