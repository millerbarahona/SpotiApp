import axios from "axios";
import { useEffect, useState } from "react";

const useSongs = (access_token, query = 'bad bunny', offset = 0) => {

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=20&${offset > 0 && `&offset=${offset}`}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token.access_token
      }
    }).then(res => {
      setSongs(res.data.tracks.items)
      setLoading(false)
    })
      .catch(error => {
        setError(true)
        setLoading(false)
      })
  }, [query, offset])
  return [songs, loading, error]
}

export default useSongs;