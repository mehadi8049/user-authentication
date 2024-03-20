import React, {useState} from 'react'
import { post } from '../Services';
import { useNavigate } from "react-router-dom";
const Register=()=>{
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    'name':'',
    'email':'',
    'password':''
  });
  const [errors,setErrors]=useState({})
  const userRegister=async (e)=>{
    e.preventDefault();
    const response = await post('/register',registerData);
    if(response?.status){
      setErrors({})
      setRegisterData(prev => ({
        ...prev,
        ...{
          'name':'',
          'email':'',
          'password':''
        }
      }))
      localStorage.setItem("successMessage", 'Successfully registred. You can login now.');
      navigate("/sign-in");
    }else{
      const message=JSON.parse(response.message);
      setErrors(prev=>({...prev,...message}))
    }
  }
  return (
    <form onSubmit={userRegister}>
        <h3>User Register</h3>
        <div className="mb-3">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="User name"
            value={registerData.name}
            onChange={(e)=>setRegisterData(prev => ({
              ...prev,
              ...{'name':e.target.value}
            }))}
          />
          {errors && errors.name && (
            <p className="text-danger">
              {errors.name[0]}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={registerData.email}
            onChange={(e)=>setRegisterData(prev => ({
              ...prev,
              ...{'email':e.target.value}
            }))}
          />
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
            value={registerData.password}
            onChange={(e)=>setRegisterData(prev => ({
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
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
  )
}

export default Register