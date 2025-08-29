export const throttle = function(fn: (...args: unknown[]) => void, to: number) {
  let timer: number | null

  return function throttleInner(...args: unknown[]) {
    if (timer) {
      return
    }

    timer = setTimeout(() => {
      // fn.apply(null, arguments as any)
      fn(...args)
      timer = null
    }, to)
  }
}

export const debounce = function(fn: (...args: unknown[]) => void, to: number) {
  let timer: number | null

  return function debounceInner(...args: unknown[]) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      // fn.apply(null, arguments as any)
      fn(...args)
      timer = null
    }, to)
  }
}

export const generateHeadingId = (heading: string) => {
  return heading.toLowerCase().replaceAll(' ', '-').replace(/[.()]/g, '')
}

