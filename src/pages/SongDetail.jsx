import React from 'react'
import { useParams } from 'react-router-dom';

export const SongDetail = () => {
  let params = useParams();
  return (
    <div>
      <h1>{params.songId}</h1>
    </div>
  )
}
