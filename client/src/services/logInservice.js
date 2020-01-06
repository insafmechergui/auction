import axios from "axios";

export default {
  checkForLogIn({ email, password }) {
    return axios
      .post("/api/logIn", { email, password })
      .then(res => res)
      .catch(err => {
        console.log(err);
      });
  }
};

// export default {
//   getAll: async () => {
//     let res = await axios.get(`/api/product`);
//     return res.data || [];
//   }
// };
