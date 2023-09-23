import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Registration = () => {
  const server = 'http://localhost:5050'
  const navig = useNavigate()
  const [acc, setAcc] = useState({})
  let name, value

  const hndlchng = (e) => {
      name = e.target.name
      value = e.target.value
      setAcc({...acc, [name]:[value]})
  }
  const hndlsub = async (e) => {
      e.preventDefault()
      const {acc_phone, acc_name, acc_email, acc_pass} = acc
  }

  return (
    <>
        <div className='rgpg'>
            <div className="rgfrm">
              <form className='rgfrm'>
                    <div className="frmgrp">
                      <label htmlFor="acc_phone">Phone No.: </label>
                      <input type="text" name="acc_phone" id="acc_phone" onChange={hndlchng} />
                    </div>
                    <div className="frmgrp">
                      <label htmlFor="acc_name">Full Name: </label>
                      <input type="text" name="acc_name" id="acc_name" onChange={hndlchng} />
                    </div>
                    <div className="frmgrp">
                      <label htmlFor="acc_email">Email Id: </label>
                      <input type="text" name="acc_email" id="acc_email" onChange={hndlchng} />
                    </div>
                    <div className="frmgrp">
                      <label htmlFor="acc_pass">Password: </label>
                      <input type="text" name="acc_pass" id="acc_pass" onChange={hndlchng} />
                    </div>
                    <div className="frmgrp">
                      <input type="submit" value="Sign Up" onClick={hndlsub} />
                    </div>
                </form>
            </div>
            <div className="gotolg">
                <span>Already Registered; Click here to log in: </span><NavLink to='/log' className='lnk'>Login</NavLink>
            </div>
        </div>
    </>
  )
}

export default Registration