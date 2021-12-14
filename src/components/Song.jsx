import React from 'react'

export const Song = ({song}) => {
  const { album, artist, name, duration_ms, photo_url } = song
  return (
    <div>
      <img src={photo_url} alt="" />
      <h1>{name}</h1>
    </div>
  )
}
