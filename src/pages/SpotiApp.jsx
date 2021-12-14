import React, { useRef, useState } from 'react'
import { Song } from '../components/Song';
import useSongs from '../hooks/useSongs';
import useToken from '../hooks/useToken'

export const SpotiApp = () => {
  const [query, setQuery] = useState('');
  const [token] = useToken();
  const [songs, loading, error] = useSongs(token, query);
  const inputRef = useRef();
  let interval
  const handleTip = () => {
    clearTimeout(interval)
    interval = setTimeout(() => setQuery(inputRef.current.value), 500)
  }

  return (
    <div>
      <input type="text" onChange={handleTip} ref={inputRef}/>
      {!loading && (
        songs.map((song, index) => (
          <Song song={song} key={index}/>
        ))
      )}
    </div>
  )
}
