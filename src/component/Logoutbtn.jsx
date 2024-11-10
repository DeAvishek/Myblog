import React from 'react'
import { useDispatch } from 'react-redux'
import  authservice  from '../appwrite/auth'
import { logout} from "../store/authSlice";
const Logoutbtn = () => {
  const dispatch=useDispatch();
  const logouthandler=()=>
  {
    authservice.logout()
    .then(()=>{dispatch(logout())})
  }
  return (
    <div>
      <button onClick={logouthandler}className='btn btn-primary btn-sm'>Logout</button>
    </div>
  )
}

export default Logoutbtn
