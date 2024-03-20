import React, {useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { post } from '../Services';
import { AuthDispatchContext } from '../context/AuthContext';

export default function Login() {
  const setAuthDetails=useContext(AuthDispatchContext);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    'email':'',
    'password':''
  });
  const [errors,setErrors]=useState({})
  const [errorMessage,setErrorMessage]=useState(null)
  const userLogin=async (e)=>{
    e.preventDefault();
    const response = await post('/login',loginData);
    if(response?.status){
      setErrorMessage(null)
      setErrors({})
      setLoginData(prev => ({
        ...prev,
        ...{
          'email':'',
          'password':''
        }
      }))
      localStorage.setItem("loginData", JSON.stringify(response.data));
      setAuthDetails(JSON.parse(localStorage.getItem("loginData")));
      navigate("/dashboard");
    }else{
      if(response?.errorMessage){
        setErrorMessage(response?.errorMessage)
      }else{
        const message=JSON.parse(response.message);
        setErrors(prev=>({...prev,...message}))
      }
    }
  }
  const success = localStorage.getItem("successMessage");
  if(success){
    localStorage.removeItem("successMessage");
  }
  
  return (
    <form onSubmit={userLogin}>
       <p className='text-success'>{success?success:''}</p>
        <h3>Login</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={loginData.email}
            onChange={(e)=>setLoginData(prev => ({
              ...prev,
              ...{'email':e.target.value}
            }))}
          />
          {errorMessage && (
            <p className="text-danger">
              {errorMessage}
            </p>
          )}
          {errors && errors.email && (
            <p className="text-danger">
              {errors.email[0]}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={loginData.password}
            onChange={(e)=>setLoginData(prev => ({
              ...prev,
              ...{'password':e.target.value}
            }))}
          />
          {errors && errors.password && (
            <p className="text-danger">
              {errors.password[0]}
            </p>
          )}
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
  )
}
