import React from 'react'

const P: React.FC<{
  init: (container: HTMLDivElement) => void
}> = ({ children, init }) => {

  const container = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    init(container.current)
  })

  return (
    <div ref={container}>
      {children}
    </div>
  )
}

export default P
