import axios from "axios";
import cookie from "js-cookie";

export default axios.create({
  baseURL: process.env.REACT_APP_CORE_SERVER,
  headers: {
    Authorization: cookie.get("token"),
  },
});
