import axios from "axios";

export default {
  checkIfAdmin: id => {
    return axios
      .post("/api/checkAdmin", { id })
      .then(response => response)
      .catch(err => {
        throw err;
      });
  }
};
