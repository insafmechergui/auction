import axios from "axios";

export default {
  add: product => {
    return axios
      .post("/api/addp", {
        name: product.name,
        descreption: product.descreption,
        image: product.image,
        images: product.images,
        category: product.category,
        value: product.value,
        initial_date: product.initial_date,
        end_date: product.end_date
      })
      .then(response => response)
      .catch(error => error);
  },
  getAll: () => {
    return axios
      .get("/api/products")
      .then(response => response)
      .catch(err => {
        throw err;
      });
  },
  getOne: idp => {
    return axios
      .get("/api/product", { params: { id: idp } })
      .then(response => response)
      .catch(err => {
        throw err;
      });
  },

  // service search
  search: desc => {
    return axios
      .get("/api/productsearch", { params: { descreption: desc } })
      .then(response => response)
      .catch(err => {
        throw err;
      });
  },
  // service get winner
  winner: () => {
    return axios
      .get("/api/productWinner")
      .then(response => {
        console.log("sssssssssss", response);

        return response;
      })

      .catch(err => {
        console.log("rrrrrrrrrrrrrr", err);
      });
  }
};
