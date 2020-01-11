import axios from "axios";

export default {
  checkForLogIn({ email, password }) {
    console.log('services   s', { email, password })
    return axios
      .post("/api/logIn", { email, password })
      .then(res => res)
      .catch(err => {
        console.log(err);
      });
  }
};
