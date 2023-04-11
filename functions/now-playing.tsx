import fs from 'fs/promises'

import type { APIGatewayProxyHandler } from 'aws-lambda'
import satori from 'satori'
import { getCurrentlyPlaying, getRecentlyPlayedTracks } from 'services/spotify'

export const handler: APIGatewayProxyHandler = async ({
  queryStringParameters,
}) => {
  const { json, open } = queryStringParameters ?? {}
  const currentlyPlaying = await getCurrentlyPlaying()
  const recentlyPlayedTracks = await getRecentlyPlayedTracks()

  const track = currentlyPlaying || recentlyPlayedTracks.items[0].track

  if (typeof open === 'string') {
    return {
      body: '',
      headers: {
        'Content-Type': '',
        Location: track.external_urls.spotify,
      },
      statusCode: 302,
    }
  }

  if (typeof json === 'string') {
    return {
      body: JSON.stringify(track),
      headers: {
        'Content-Type': 'application/json',
        Location: '',
      },
      statusCode: 200,
    }
  }

  const font = await fs.readFile('./assets/Roboto-Regular.ttf')

  const body = await satori(
    <div
      style={{
        display: 'flex',
        position: 'relative',
      }}
    >
      <img
        src={track.album.images[0].url}
        height={320}
        width={320}
        style={{ top: 0, left: 0, filter: 'blur(36px)', position: 'absolute' }}
      />
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: 320,
          height: 320,
        }}
      >
        <img
          src={track.album.images[0].url}
          height={128}
          width={128}
          style={{ borderRadius: '8px', marginBottom: '8px' }}
        />
        <div
          style={{
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.3)',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: '8px',
            padding: '16px',
            maxWidth: 300,
          }}
        >
          <p
            style={{
              fontSize: '1.25em',
              marginTop: 0,
              marginBottom: '4px',
              textAlign: 'center',
            }}
          >
            {track.name}
          </p>
          <p
            style={{
              marginTop: 0,
              marginBottom: '4px',
              opacity: 0.75,
              textAlign: 'center',
            }}
          >
            {track.artists.map((artist) => artist.name).join(', ')}
          </p>
          <p
            style={{
              marginTop: 0,
              marginBottom: 0,
              opacity: 0.75,
              textAlign: 'center',
            }}
          >
            {track.album.name}
          </p>
        </div>
      </div>
    </div>,
    {
      width: 320,
      height: 320,
      fonts: [
        {
          name: 'Roboto',
          data: font,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  )

  return {
    body,
    headers: {
      'Content-Type': 'image/svg+xml',
      Location: '',
    },
    statusCode: 200,
  }
}
