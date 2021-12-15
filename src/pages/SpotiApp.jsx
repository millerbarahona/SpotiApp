import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Song } from '../components/Song';
import useSongs from '../hooks/useSongs';
import useToken from '../hooks/useToken'
import styles from '../styles/Container.module.css';

export const SpotiApp = () => {
  const [query, setQuery] = useState('');
  const [token] = useToken();
  const [pageNumber, setPageNumber] = useState(0)
  const [songs, loading, error] = useSongs(token, query, pageNumber);
  const inputRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const observer = useRef();

  let interval

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setQuery(q)
    }
  }, []);

  const handleTip = () => {
    const q = inputRef.current.value
    setSearchParams({ q })
    setPageNumber(0);
    clearTimeout(interval)
    interval = setTimeout(() => setQuery(inputRef.current.value), 1000)
  }

  const lastSongRef = useCallback(node => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        console.log(songs.length)
        console.log(entries[0].target)
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    })
    if (node) observer.current.observe(node)
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.input_div} id='input_container'>
        <input className={styles.input} id='input' type="text" onChange={handleTip} ref={inputRef} placeholder='Ingrese una canción etc' value={searchParams.get('q') || ''} />
        <div className={styles.logo_container}>
          <img src="https://cdn-icons-png.flaticon.com/512/49/49097.png" alt="" className={styles.logo} />
        </div>
      </div>
      <section className={styles.songs_container} id='songs_container'>
        {!loading && (
          songs.map((song, index) => {
            if (index + 1 === songs.length) {
              return <Link to={`song/${song.id}`} key={index} style={{ textDecoration: 'none' }} ref={lastSongRef}>
                <Song song={song} />
              </Link>
            }
            return <Link to={`song/${song.id}`} key={index} style={{ textDecoration: 'none' }}>
              <Song song={song} />
            </Link>
          })
        )}
      </section>
    </div>
  )
}
