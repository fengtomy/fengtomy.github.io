export const throttle = function(fn: () => void, to: number) {
  let timer: number | null

  return function throttleInner() {
    if (timer) {
      return
    }

    timer = setTimeout(() => {
      fn.apply(null, arguments as any)
      timer = null
    }, to)
  }
}

export const debounce = function(fn: () => void, to: number) {
  let timer: number | null

  return function debounceInner() {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(null, arguments as any)
      timer = null
    }, to)
  }
}

export const generateHeadingId = (heading: string) => {
  return heading.toLowerCase().replaceAll(' ', '-').replace(/[.()]/g, '')
}

