import axios from "axios";
import { useEffect, useState } from "react";

const useSongs = (access_token, query = 'bad bunny', offset = 0) => {

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    let cancel
    if (offset === 0) setSongs([])
    axios(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=40&${offset > 0 && `&offset=${offset * 40}`}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token.access_token
      },
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        const listSongs = res.data.tracks.items
        listSongs.map(song => {
          const { album, artists, name, duration_ms, preview_url, href, id } = song
          axios(song.album.href, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + access_token.access_token
            }
          }).then(img => {
            const photo_url = img.data.images[1].url
            setSongs(prevSongs => [...prevSongs, { album, artists, name, duration_ms, photo_url, preview_url, href, id }])
          })
        })
      })
      .catch(error => {
        if (axios.isCancel(error)) return
        setError(true)
        setLoading(false)
      })
    setLoading(false)
    return () => cancel();
  }, [access_token, query, offset]);

  return [songs, loading, error]
}

export default useSongs;