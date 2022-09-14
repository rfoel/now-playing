import React from 'react'

import Wrapper from './Wrapper'

const Player: React.FC<{
  album: { cover: string; name: string }
  artists: string
  name: string
}> = ({ album, artists, name }) => (
  <Wrapper>
    <img
      alt={album.name}
      src={album.cover}
      style={{
        height: '150px',
        width: '150px',
      }}
    />
    <h1>{name}</h1>
    <h2>{artists}</h2>
  </Wrapper>
)

export default Player
