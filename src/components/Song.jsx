import React from 'react';
import styles from '../styles/Song.module.css';

export const Song = ({ song }) => {
  const { album, artists, name, duration_ms, photo_url } = song
  let list_artists = '';
  artists.map(artist => {
    list_artists += ' | ' + artist.name
  })
  console.log(artists)
  return (
    <div className={styles.song_container}>
      <div className={styles.title_container}>
        <h1 className={styles.song_title}>{name}<span className={styles.artist}> {list_artists} </span></h1>
      </div>
      <img className={styles.song_img} src={photo_url} alt="" />
    </div>
  )
}
