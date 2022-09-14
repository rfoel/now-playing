import React from 'react'

import { CurrentlyPlaying } from 'services/spotify'
import Wrapper from './Wrapper'

const Player: React.FC<CurrentlyPlaying> = ({ item }) => (
  <Wrapper>
    <a href={`https://open.spotify.com/track/${item.id}`}>
      <img
        alt={item.album.name}
        src={item.album.images[0].url}
        style={{
          height: '150px',
          width: '150px',
        }}
      />
      <h1>{item.name}</h1>
      <h2>{item.artists.map(artist => artist.name).join(', ')}</h2>
    </a>
  </Wrapper>
)

export default Player
