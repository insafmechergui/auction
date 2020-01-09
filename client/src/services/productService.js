import axios from "axios";

// export default {
//   getAll: async () => {
//     let res = await axios.get(`/api/product`);
//     return res.data || [];
//   }
// };




export default {
  getAll: product => {
    return axios
      .post("/api/add", {
        name: product.name,
        descreption: product.descreption,
        image: product.image,
        category: product.category,
        value: product.value,
        initial_date: product.initial_date,
        duration: product.duration
      })
      .then(response => response)
      .catch(error => error);
  }

};

