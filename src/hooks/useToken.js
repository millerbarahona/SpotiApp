import axios from "axios"
import { Base64 } from "js-base64"
import { useEffect, useState } from "react"

const useToken = () => {
  const id = import.meta.env.VITE_CLIENT_ID_SPOTIFY
  const secret = import.meta.env.VITE_CLIENT_SECRET_SPOTIFY
  console.log(id)
  const base64 = Base64.encode(id + ':' + secret)
  const [token, setToken] = useState({});

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + base64
      },
      data: 'grant_type=client_credentials'
    }).then(res => {
      setToken({
        access_token: res.data.access_token,
        token_type: res.data.token_type
      })
    })
  }, [])

  return [token]
}

export default useToken;