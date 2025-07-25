import { lazy, Suspense } from 'react'

export const loadable = (componentPath) => {
  const LazyComponent = lazy(() => import(componentPath))

  return () => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  )
}
