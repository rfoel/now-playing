import got from 'got'

const client = got.extend({
  prefixUrl: 'https://api.spotify.com/v1/',
  mutableDefaults: true,
})

const refreshToken = async () => {
  if (client.defaults.options.headers.Authorization) return

  const data = await got
    .post('https://accounts.spotify.com/api/token', {
      username: process.env.SPOTIFY_CLIENT_ID,
      password: process.env.SPOTIFY_CLIENT_SECRET,
      form: {
        grant_type: 'refresh_token',
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
      },
    })
    .json<{
      access_token: string
      token_type: 'Bearer'
      expires_in: number
      scope: string
    }>()

  client.defaults.options.merge({
    headers: {
      Authorization: `${data.token_type} ${data.access_token}`,
    },
  })
}

export const getCurrentlyPlaying = async () => {
  await refreshToken()

  const data = await client
    .get('me/player/currently-playing')
    .json<SpotifyApi.CurrentlyPlayingResponse>()

  if (data.item) {
    return data.item as SpotifyApi.TrackObjectFull
  }

  return data.item
}

export const getRecentlyPlayedTracks = async () => {
  await refreshToken()

  const data = await client
    .get('me/player/recently-played')
    .json<SpotifyApi.UsersRecentlyPlayedTracksResponse>()

  return data
}
