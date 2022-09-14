import type { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import Player from 'components/Player'
import got from 'got'
import { renderToString } from 'react-dom/server'

import { getCurrentlyPlaying } from 'services/spotify'

export const handler: APIGatewayProxyHandlerV2 = async () => {
  const data = await getCurrentlyPlaying()
  if (data.item) {
    const buffer = await got(data.item.album.images[0].url).buffer()
    const cover = `data:image/jpeg;base64,${buffer.toString('base64')}`
    const body = renderToString(
      Player({
        album: {
          cover,
          name: data.item.album.name,
        },
        artists: data.item.artists.map(artist => artist.name).join(', '),
        name: data.item.name,
      }),
    )
    return {
      body,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 's-maxage=1, stale-while-revalidate',
      },
      statusCode: 200,
    }
  }
  return { body: JSON.stringify(data), statusCode: 200 }
}
