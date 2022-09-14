import React from 'react'

const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <svg
    fill="none"
    height={220}
    viewBox={`0 0 ${600} ${220}`}
    width={600}
    xmlns="http://www.w3.org/2000/svg"
  >
    <foreignObject height={220} width={600}>
      <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' }}>
        <style>{`
              * {
                box-sizing: border-box;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                margin: 0;
              }
              a {
                color: black;
                text-decoration: none;
              }
              a, h1, h2 {
                mix-blend-mode: difference;
              }
            `}</style>
        {children}
      </div>
    </foreignObject>
  </svg>
)

export default Wrapper
