import axios from "axios";

const auth = axios.create({
  baseURL: "http://localhost:5000",
});



export default auth;
