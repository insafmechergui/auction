import React from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import serviceProduct from "../../services/productService.js";
import adminServices from "./../../services/adminServices.js";

class AllWinner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }
  checkauth(id) {
    //call function from the admin service to check if can enter this page
    adminServices.checkIfAdmin(id);
  }

  componentDidMount() {
    // this.checkauth(this.props.userInfo.id);

    serviceProduct.winner().then(res => {
      console.log("ffffffffffffffffffffffff", res);
      if (res) {
        this.setState({ products: res.data || [] });
      }
    });
    //   .then(res => {
    //     console.log("prrrrooowiin", res.data);
    //   });
  }

  render() {
    return (
      <div id="productTable">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>winner</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(product => {
              return (
                <tr>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  {(product.participants[0] !== undefined && (
                    <td>{product.participants[0]._id}</td>
                  )) || <td>No winner</td>}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default AllWinner;
