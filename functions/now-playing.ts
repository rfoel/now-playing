import type { APIGatewayProxyHandler } from 'aws-lambda'
import Player from 'components/Player'
import got from 'got'
import { renderToString } from 'react-dom/server'
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

  const buffer = await got(track.album.images[0].url).buffer()
  const cover = `data:image/jpeg;base64,${buffer.toString('base64')}`
  const body = renderToString(
    Player({
      album: {
        cover,
        name: track.album.name,
      },
      artists: track.artists.map((artist) => artist.name).join(', '),
      name: track.name,
      playedAt: currentlyPlaying
        ? recentlyPlayedTracks.items[0].played_at
        : undefined,
    }),
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
