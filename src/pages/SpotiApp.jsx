import React, { useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Song } from '../components/Song';
import useSongs from '../hooks/useSongs';
import useToken from '../hooks/useToken'
import styles from '../styles/Container.module.css';

export const SpotiApp = () => {
  const params = useParams()
  const [query, setQuery] = useState('');
  const [token] = useToken();
  const [songs, loading, error] = useSongs(token, query);
  const inputRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  let interval
  const handleTip = () => {
    const q = inputRef.current.value
    setSearchParams({q})
    clearTimeout(interval)
    interval = setTimeout(() => setQuery(inputRef.current.value), 400)
  }

  return (
    <div className={styles.container}>
      <div className={styles.input_div}>
        <input className={styles.input} type="text" onChange={handleTip} ref={inputRef} placeholder='Ingrese una canción etc' value={searchParams.get('q')}/>
        <div className={styles.logo_container}>
          <img src="https://cdn-icons-png.flaticon.com/512/49/49097.png" alt="" className={styles.logo} />
        </div>
      </div>
      <section className={styles.songs_container}>
        {!loading && (
          songs.map((song, index) => (
            <Link to={`song/${song.id}`} key={index}>
            <Song song={song} />
            </Link>
          ))
        )}
      </section>
    </div>
  )
}
