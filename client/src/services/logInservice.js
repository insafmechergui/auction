import axios from "axios";

export default {
  checkForLogIn({ email, password }) {
    return axios
      .post("/api/logIn", { email, password })
      .then(res => res)
      .catch(err => err.response);
  }
};
