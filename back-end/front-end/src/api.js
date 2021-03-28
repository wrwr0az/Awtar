import API_URL from "./apiConfig";
// const API_URL=require('./apiConfig')
import axios from "axios";

// INDEX, SHOW, CREATE, UPDATE, DESTROY

// Get All Articles
const getAllMessage = () => {
  return axios.get(`${API_URL}/api/Messages`);
};

// Delete Article by ID
const deleteMessageByID = (id) => {
  return axios.delete(`${API_URL}/api/Messages/${id}`);
};

const insertOneMessage = (data) => {
  return axios.post(`${API_URL}/api/Messages/`, data);
};

const signIn = async (userName, password) => {
  // return axios.get(`${API_URL}/api/login/${userName}/${password}`);
  let body = {
    userName: userName,
    password: password,
  };
  return await axios.post(`${API_URL}/api/login/`, body, {
    withCredentials: true,
  });
};

const refreshToken = async () => {
  // console.log(API_URL);

  return fetch(`${API_URL}/refresh_token`, {
    withCredentials: true, // Needed to include the cookie
  });
};

const fetchProtected = async () => {
  return await fetch(`${API_URL}/api/protected`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const logOutCallback = async () => {
  await fetch("http://localhost:4000/logout", {
    method: "POST",
    credentials: "include", // Needed to include the cookie
  });
};

export {
  getAllMessage,
  deleteMessageByID,
  insertOneMessage,
  signIn,
  refreshToken,
  fetchProtected,
  logOutCallback,
};
