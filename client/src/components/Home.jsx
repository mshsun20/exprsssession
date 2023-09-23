import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const server = 'http://localhost:5050'
    const navig = useNavigate()
    const [usr, setUsr] = useState('')

    axios.defaults.withCredentials = true

    const getSess = async () => {
        const res = await axios.get(`${server}/home`)
        const data = await res.data
        // console.log(data)
        if (data.statuscode===200) {
            console.log(data.message)
            setUsr(data.user)
        }
        else {
            navig('/log')
        }
    }
    useEffect(() => {
        getSess()
    }, [])

  return (
    <>
        <div>Welcome "{usr}"</div>
    </>
  )
}

export default Home