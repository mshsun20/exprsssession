import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const server = 'http://localhost:5050'
    const navig = useNavigate()
    const [chk, setChk] = useState({})
    let name, value

    axios.defaults.withCredentials = true

    const hndlchng = (e) => {
        name = e.target.name
        value = e.target.value
        setChk({...chk, [name]:[value]})
    }
    const hndlsub = async (e) => {
        e.preventDefault()
        const {acc_email, acc_pass} = chk
        const res = await axios.post(`${server}/login`, {acc_email, acc_pass})
        const data = await res.data
        // console.log(data)
        if (data.statuscode===200) {
            window.alert(data.success)
            navig('/')
        }
        else if (data.statuscode===401) {
            window.alert(data.error)
        }
        else {
            window.alert(data.error)
        }
    }

  return (
    <>
        <div className='lgpg'>
            <div className="lgfrm">
                <form className='lgfrm'>
                    <div className="frmgrp">
                        <label htmlFor="acc_email">Email Id: </label>
                        <input type="text" name="acc_email" id="acc_email" onChange={hndlchng} />
                    </div>
                    <div className="frmgrp">
                        <label htmlFor="acc_pass">Password: </label>
                        <input type="text" name="acc_pass" id="acc_pass" onChange={hndlchng} />
                    </div>
                    <div className="frmgrp">
                        <input type="submit" value="Sign In" onClick={hndlsub} />
                    </div>
                </form>
            </div>
            <div className="gotorg">
                <span>Not Yet Registered; Click here: </span><NavLink to='/reg' className='lnk'>Registration</NavLink>
            </div>
        </div>
    </>
  )
}

export default Login