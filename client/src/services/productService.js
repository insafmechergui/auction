import axios from "axios";

export default {
  add: product => {
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
  },
  getAll: () => {

    return axios
      .get("/api/products")
      .then(response => response)
      .catch(err => { throw err }
      );
  },
  getOne: (idp) => {
    return axios
      .get("/api/product", { params: { id: idp } })
      .then(response => response)
      .catch(err => { throw err }
      );
  },



};

