import axios from "axios";

export default {
    updateAuction: (id, price, idUser) => {
        return axios
            .put("/api/updateAuction", { id: id, price: price, idUser: idUser })
            .then(response => response)
            .catch(err => { throw err }
            );
    }

};

