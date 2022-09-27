import axios from "axios";

const API_URL = "/gmail/user/";

// Log user
const log = async (userName) => {
 const body = {
  name: userName
 };
 let response = await axios.put(API_URL, body);
 if (response.data) {
  localStorage.setItem("user", JSON.stringify(response.data));
 }
 return response.data;
};

const userService = {
 log,
};

export default userService;