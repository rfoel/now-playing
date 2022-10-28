import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import Wrapper from './Wrapper'

dayjs.extend(relativeTime)

type PlayerProps = {
  album: { cover: string; name: string }
  artists: string
  name: string
  playedAt?: string
}

const Player = ({ album, artists, name, playedAt }: PlayerProps) => (
  <Wrapper>
    <img
      alt={album.name}
      src={album.cover}
      style={{
        height: '128px',
        width: '128px',
      }}
    />
    <h1>{name}</h1>
    <h2>{artists}</h2>
    {playedAt ? <span>{dayjs(playedAt).fromNow()}</span> : null}
  </Wrapper>
)

export default Player
