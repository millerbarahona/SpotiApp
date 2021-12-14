import React, { useRef, useState } from 'react'
import { Song } from '../components/Song';
import useSongs from '../hooks/useSongs';
import useToken from '../hooks/useToken'
import styles from '../styles/Container.module.css';

export const SpotiApp = () => {
  const [query, setQuery] = useState('');
  const [token] = useToken();
  const [songs, loading, error] = useSongs(token, query);
  const inputRef = useRef();
  let interval

  const handleTip = () => {
    clearTimeout(interval)
    interval = setTimeout(() => setQuery(inputRef.current.value), 400)
  }

  return (
    <div className={styles.container}>
      <div className={styles.input_div}>
        <input className={styles.input} type="text" onChange={handleTip} ref={inputRef} placeholder='Ingrese un artista, canción etc'/>
      </div>
      <section className={styles.songs_container}>
        {!loading && (
          songs.map((song, index) => (
            <Song song={song} key={index} />
          ))
        )}
      </section>
    </div>
  )
}
