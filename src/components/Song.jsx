import React from 'react';
import styles from '../styles/Song.module.css';

export const Song = ({ song }) => {
  const { album, artists, name, duration_ms, photo_url } = song

  return (
    <div className={styles.song_container}>
      <div className={styles.title_container}>
        <h1 className={styles.song_title}>{name}</h1>
        <h2 className={styles.artist}> {artists[0].name} </h2>
      </div>
      <img className={styles.song_img} src={photo_url} alt="" />
    </div>
  )
}
