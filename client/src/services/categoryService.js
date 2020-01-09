import axios from "axios";

export default {
    add: category => {

        return axios
            .post("/api/AddCategory", {
                name: category.name,
            })
            .then(response => response)
            .catch(err => { throw err }
            );
    }
};
