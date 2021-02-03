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

const signIn = (userName, password) => {
  return axios.get(`${API_URL}/api/login/${userName}/${password}`);
};

export { getAllMessage, deleteMessageByID, insertOneMessage, signIn };
