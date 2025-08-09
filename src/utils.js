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

export const getColorScheme = () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  return {
    light: isLight,
    dark: isDark,
  }
}
