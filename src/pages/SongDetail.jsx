import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useSong from '../hooks/useSong';
import useToken from '../hooks/useToken';
import styles from '../styles/DetailSong.module.css';

export const SongDetail = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [token] = useToken();
  const baseUrl = `https://api.spotify.com/v1/tracks/${params.songId}`;
  const [[song, album], loading, error] = useSong(baseUrl, token);

  function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  return (
    <div >
      {
        !loading && !error && (
          <section>
            <div className={styles.container} >
              <div className={styles.song}>
                <button onClick={() => navigate(-1)} className={styles.back_button}>
                  <img src="https://cdn.icon-icons.com/icons2/2596/PNG/512/return_icon_154912.png" alt="" style={{ width: 40 }} />
                </button>
                <img className={styles.track_img} src={song.data.album.images[1].url} alt="" />
                <div>
                  <div className={styles.name_dontainer}>
                    <h1 className={styles.name_track}>{song.data.name + '| '} <span>{millisToMinutesAndSeconds(song.data.duration_ms)} min</span></h1>
                  </div>
                  <audio controls name="media" className={styles.audio}>
                    <source src={song.data.preview_url} type="audio/mpeg" />
                  </audio>
                  <div className={styles.album_data}>
                    <h1>{song.data.artists[0].name} |{album.data.name}</h1>
                  </div>
                  <h1>{album.data.release_date}</h1>
                </div>
              </div>

              <div className={styles.album_list}>
                <h1>Album List</h1>
                <hr />
                <div className={styles.tracks_list}>
                  {
                    album.data.tracks.items.map((track, index) => (
                      <div className={styles.track_container} key={index}>
                        <div>
                          <h1 className={styles.track} >{track.name}</h1>
                        </div>
                        <div>
                          <h2 className={styles.duration}>{millisToMinutesAndSeconds(track.duration_ms)} min</h2>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </section>
        )
      }
      {
        error && (
          <div className={styles.error_container}>
            <button onClick={() => navigate(-1)}>atras</button>
            <h1>Oooops...</h1>
            <h2>Hubo un error, inténtalo de nuevo :(</h2>
          </div>
        )
      }

    </div>
  )
}
