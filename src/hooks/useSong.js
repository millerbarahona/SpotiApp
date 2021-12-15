import axios from "axios";
import { useEffect, useState } from "react";

const useSong = (baseUrl, access_token) => {

  const [song, setSong] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancel
    axios(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token.access_token
      },
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        axios(res.data.album.href, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token.access_token
          }
        }).then(album => {
          setSong([res, album])
          setLoading(false)          
        })
      })
      .catch(error => {
        if (axios.isCancel(error)) return
        setError(true)
        setLoading(false)
      })
    return () => cancel();
  }, [access_token]);

  return [song, loading, error]
}

export default useSong;