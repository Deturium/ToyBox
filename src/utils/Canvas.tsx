import React from 'react'

export type InitFn = (
  canvas: HTMLCanvasElement,
  container: HTMLDivElement,
) => void

const Canvas: React.FC<{
  initFn: InitFn
}> = ({ children, initFn }) => {

  const containerRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useLayoutEffect(() => {
    initFn(canvasRef.current, containerRef.current)
  }, [])

  return (
    <div ref={containerRef}>
      <canvas ref={canvasRef}>
        {children}
      </canvas>
    </div>
  )
}

export default Canvas
