import React from 'react'

export type InitFn = (container: HTMLDivElement) => void

const Canvas: React.FC<{
  initFn: InitFn
}> = ({ children, initFn }) => {

  const container = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    initFn(container.current)
  }, [])

  return (
    <div ref={container}>
      {children}
    </div>
  )
}

export default Canvas
