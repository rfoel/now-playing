import type { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import Player from 'components/Player'
import { renderToString } from 'react-dom/server'

import { getCurrentlyPlaying } from 'services/spotify'

export const handler: APIGatewayProxyHandlerV2 = async () => {
  const data = await getCurrentlyPlaying()
  if (data.item) {
    const body = renderToString(Player(data))
    return {
      body,
      headers: {
        'Content-Type': 'image/svg+xml',
      },
      statusCode: 200,
    }
  }
  return { body: JSON.stringify(data), statusCode: 200 }
}
