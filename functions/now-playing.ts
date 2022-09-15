import type { APIGatewayProxyHandler } from 'aws-lambda'
import Player from 'components/Player'
import got from 'got'
import { renderToString } from 'react-dom/server'

import { getCurrentlyPlaying } from 'services/spotify'

export const handler: APIGatewayProxyHandler = async ({
  queryStringParameters,
}) => {
  const { json, open } = queryStringParameters ?? {}
  const data = await getCurrentlyPlaying()
  if (data.item) {
    if (typeof open === 'string') {
      return {
        headers: {
          Location: data.item.external_urls.spotify,
        },
        statusCode: 302,
      }
    }
    if (typeof json === 'string') {
      return {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
      }
    }
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
