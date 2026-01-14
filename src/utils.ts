export const homeLinks = [
  { to: '/blog-post/integrate-typescript-into-react-vite', title: 'Integrate TypeScript into React+Vite project' },
  { to: '/blog-post/attach-event-listener-with-ref', title: 'Attach event listener in React, with ref?' },
  { to: '/blog-post/javascript-map', title: 'Map in ECMA2015' },
  { to: '/blog-post/refresh-404-in-spa', title: '404 error on page reload in React and React-Router projects' },
  { to: '/blog-post/understand-cors', title: 'Understanding cross-origin and CORS' },
  { to: '/blog-post/new-in-ecma2025', title: "What's new in ECMA2025" },
  { to: '/blog-post/new-in-ecma2024', title: "What's new in ECMA2024" },
  { to: '/blog-post/new-in-ecma2023', title: "What's new in ECMA2023" },
  { to: '/blog-post/websocket-intro', title: 'WebSocket Intro' },
  { to: '/blog-post/vue-clean-code', title: 'Vue clean code in daily work' },
]

// export const throttle = function(fn: (...args: unknown[]) => void, to: number) {
//   let timer: NodeJS.Timeout | null

//   return function throttleInner(...args: unknown[]) {
//     if (timer) {
//       return
//     }

//     timer = setTimeout(() => {
//       // fn.apply(null, arguments as any)
//       fn(...args)
//       timer = null
//     }, to)
//   }
// }

// export const debounce = function(fn: (...args: unknown[]) => void, to: number) {
//   let timer: NodeJS.Timeout | null

//   return function debounceInner(...args: unknown[]) {
//     if (timer) {
//       clearTimeout(timer)
//     }

//     timer = setTimeout(() => {
//       // fn.apply(null, arguments as any)
//       fn(...args)
//       timer = null
//     }, to)
//   }
// }

export const generateHeadingId = (heading: string) => {
  return heading.toLowerCase().replaceAll(' ', '-').replace(/[.()]/g, '')
}

