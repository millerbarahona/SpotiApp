import axios from "axios";
import { useEffect, useState } from "react";

const useSongs = (access_token, query = 'bad bunny', offset = 0) => {

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancel
    if (offset === 0) setSongs([])
    axios(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=20&${offset > 0 && `&offset=${offset}`}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token.access_token
      },
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        const listSongs = res.data.tracks.items
        console.log('object')
        listSongs.map(song => {
          const { album, artist, name, duration_ms } = song
          axios(song.album.href, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + access_token.access_token
            }
          }).then(img => {
            const photo_url = img.data.images[1].url
            setSongs(prevSongs => [...prevSongs, { album, artist, name, duration_ms, photo_url }])
          })
        })
        setLoading(false)
      })
      .catch(error => {
        console.log('error')
        if (axios.isCancel(error)) return
        setError(true)
        setLoading(false)
      })
    return () => cancel();
  }, [query, offset]);

  return [songs, loading, error]
}

export default useSongs;