# Attach event listener in React, with ref?

Recently I want to add a progress indicator to my blog pages, so I need a ref to a specific dom element, then attach a scroll listener to this dom in `useEffect`. Pretty straightforward, right. And I clearly remember that I have implemented this type of functionality lots of times in various projects before.  
But to my surprise, I cannot get the dom from `ref` in `useEffect`. Oops...

## Normal case

```javascript
const component = () => {
  const ref = useRef()
  useEffect(() => {
    console.log(ref.current) // div
    const dom = ref.current
    const handleScroll = throttle(function() {}, timeout)
    dom.addEventListener('scroll', handleScroll)
    return () => {
      dom.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div ref={ref}>
      <Markdown />
    </div>
  )
}
```

You will say that I can get the div dom definitely. Yeah, you're right.  
In this simple case, `ref.current` in useEffect is `div`, I promise you.  
But wait a moment, let me change it a bit.
Let's say only after the markdown file promise resolved, can we render this `div` structure.

## Weird case

```javascript
const component = () => {
  const [markdown, setMarkdown] = useState()
  const ref = useRef()
  useEffect(() => {
    import('/markdown/files/path.md?raw').then(r => setMarkdown(r.default))
  }, [])
  useEffect(() => {
    console.log(ref.current) // undefined
    const dom = ref.current
    const handleScroll = throttle(function() {}, timeout)
    dom.addEventListener('scroll', handleScroll)
    return () => {
      dom.removeEventListener('scroll', handleScroll)
    }
  }, [])
  if (!markdown) {
    return null
  }
  return (
    <div ref={ref}>
      <Markdown children={markdown} />
    </div>
  )
}
```

This time I cannot get `div` from `ref` in `useEffect`, it's undefined. `markdown` in the first render phase is `undefined`, so ref actually doesn't mount to div element.  
And after file import promise resolved, React starts to render `div` structure, and `ref.current` becomes this `div` element. (But why will I think I can get it at first?)  
Ok, this is the problem trapped me several times in React world. And I think you will also meet this situation.  
If you want to know more about when react attached the refs, check [it](https://react.dev/learn/manipulating-the-dom-with-refs#when-react-attaches-the-refs).  

## The solution

So how will I solve it?
At first glance, callback `useRef` is a good choice because I can attach event listeners in the callback. Change the code a bit.

```javascript
const handleScroll = throttle(function() {}, timeout)
const component = () => {
  const [markdown, setMarkdown] = useState()
  const existedRef = useCallback((node) => {
    if (node !== null) {
      console.log('node') // div
      node.addEventListener('scroll', handleScroll)
      // But how to remove handleScroll.
    }
  })
  useEffect(() => {
    import('/markdown/files/path.md?raw').then(r => setMarkdown(r.default))
  }, [])
  if (!markdown) {
    return null
  }
  return (
    <div ref={existedRef}>
      <Markdown children={markdown} />
    </div>
  )
}
```
Looks like this solution only resolves part of the problem. Because we should always remember to remove event listener when component unmounts. If we leave it there, the storage it holds will never be released and re-allocated. And this is also bad for app performance. It is not a good or the final solution.  
So we can define a new state, which holds the dom. And in callback `ref`, we only update this state. As before, we add/remove event listener in `useEffect`.

```javascript
const handleScroll = throttle(function() {}, timeout)
const component = () => {
  const [markdown, setMarkdown] = useState()
  const [dom, setDom] = useState
  const existedRef = useCallback((node) => {
    if (node !== null) {
      setDom(node)
    }
  })
  useEffect(() => {
    import('/markdown/files/path.md?raw').then(r => setMarkdown(r.default))
  }, [])
  useEffect(() => {
    if (!dom) return
    const handleScroll = throttle(function() {}, timeout)
    dom.addEventListener('scroll', handleScroll)
    return () => {
      dom.removeEventListener('scroll', handleScroll)
    }
  }, [dom])
  if (!markdown) {
    return null
  }
  return (
    <div ref={existedRef}>
      <Markdown children={markdown} />
    </div>
  )
}
```

Yeah, that's all I need to solve this problem. And if I meet this case next time, I can refer to it one more time.  
If you have other solutions for this case, please share with me.  
Thanks for your reading. Please keep on tune, as I'll write more in the future...
