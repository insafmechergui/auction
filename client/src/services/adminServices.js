import axios from "axios";

export default {
  checkIfAdmin: id => {
    return axios
      .post("/api/checkAdmin", { id })
      .then(res => {
        if (res.status === 201 && res.data.auth === "autherized") {
          return true;
        }
        return false;
      })
      .catch(err => false);
  }
};
