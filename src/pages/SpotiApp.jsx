import React, { useState } from 'react'
import useSongs from '../hooks/useSongs';
import useToken from '../hooks/useToken'

export const SpotiApp = () => {
  const [query, setQuery] = useState('');
  const [token] = useToken();
  const [songs, loading, error] = useSongs(token, query);
  console.log(query)
  
  return (
    <div>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
      {!loading && (
        songs.map((song, index) => (
          <div key={index}>
            <h1>{song.name}</h1>
          </div>
        ))
      )}
    </div>
  )
}
