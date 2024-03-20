import { post } from "../Services";
import Login from "./Login";

const Logout = async()=>{
    
    const response = await post('/logout');
    if(response?.status){
        localStorage.removeItem("loginData");
        localStorage.setItem("successMessage", 'User succesfully logout.');
        window.location.href = '/sign-in';
    }
    
}

export default Logout;