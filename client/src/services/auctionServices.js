import axios from "axios";

export default {
    updateAuction: (id, price, idUser, date) => {
        return axios
            .put("/api/updateAuction", { date: date, id: id, price: price, idUser: idUser })
            .then(response => response)
            .catch(err => { throw err }
            );
    }

};

