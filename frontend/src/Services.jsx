import axios from "axios";
import { useContext } from "react";

/**
 * insert data()
 *
 * @param {object} data
 */

axios.defaults.baseURL = env.APP_REACT_API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const get = async (route,data={}) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer '+JSON.parse(localStorage.getItem("loginData"))?.access_token;
  return await axios.get("/v1"+route,{params:data}).then(response => response.data).catch(error=>error.response.data)
}

const post = async (route,data) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer '+JSON.parse(localStorage.getItem("loginData"))?.access_token;
  return await axios.post("/v1"+route,data).then(response => response.data).catch(error=>error.response.data);
};

export {post,get}