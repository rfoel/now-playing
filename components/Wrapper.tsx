import React from 'react'

const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <svg
    fill='none'
    height={220}
    viewBox={`0 0 ${800} ${220}`}
    width={800}
    xmlns='http://www.w3.org/2000/svg'
  >
    <foreignObject height={220} width={800}>
      <div
        {...{
          xmlns: 'http://www.w3.org/1999/xhtml',
          style: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
          },
        }}
      >
        <style>{`
              * {
                box-sizing: border-box;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                margin: 0;
                line-height: 1.2em;
              }
              
              h1 {
                font-size: 1.5em;
              }

              h2 {
                font-size: 1.2em;
              }

              h1, h2, span {
                mix-blend-mode: difference;
              }
            `}</style>
        {children}
      </div>
    </foreignObject>
  </svg>
)

export default Wrapper
