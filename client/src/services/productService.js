import axios from "axios";

export default {
  getAll: async () => {
    let res = await axios.get(`/api/product`);
    return res.data || [];
  }
};




// import axios from "axios";

// export default {
//   getAll: product =>  {
//     return axios
//     .post('/api/addProduct', { 
//       name: product.name,
//       description: product.description,
//       value: product.value,
//       startDate: product.startDate

//     })
//     .then(response =>  response)
//     .catch(error => error);
//   }
  
// };
