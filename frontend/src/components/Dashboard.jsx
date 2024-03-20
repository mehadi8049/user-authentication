import { useState,useEffect } from "react";
import { get } from "../Services";

const Dashboard=()=>{
  const [user,setUser]=useState({});
  const [isLoading,setIsLoading]=useState(true)
  useEffect(()=>{
    ((async () => {
      const response = await get('/profile');
      if(response?.status){
        setUser(response.data.user);
        setIsLoading(false);
      }else{
        setIsLoading(false);
      }
    })())
   
  },[])
  if(isLoading){
    return (
      <div>
        <p>Loading....</p>
      </div>
    )
  }
  return (
    <div>
      <h3>User Name: {user.name}</h3>
      <h3>Email: {user.email}</h3>
    </div>
  )
}
 export default Dashboard;
