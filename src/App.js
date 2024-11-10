import { useState,useEffect } from "react";
import { login,logout } from "./store/authSlice";
import authservice from"./appwrite/auth";
import { useDispatch } from "react-redux";
import Header from "./component/Header";
function App() {
  const [loading, setloading] = useState(true);
  const dispatch=useDispatch();
  useEffect(()=>{
    authservice.getCurruser()
    .then((userData)=>{
      if(userData)
      {
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setloading(false))
  },[])
  console.log(process.env.REACT_APP_APPWRITE_URL)
  return !loading?(
    <Header/>
  ):null;
 
}

export default App;
