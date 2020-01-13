import React from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import AddProduct from "../Product/addProduct.js";
import serviceProduct from "../../services/productService.js";
import adminServices from "./../../services/adminServices.js";
import AllWinner from "./allwinner";

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      render: <h1> you really shouldn't be here </h1>
    };
  }
  checkauth(id) {
    //call function from the admin service to check if can enter this page
    adminServices
      .checkIfAdmin(id)
      .then(res => {
        if (res === true) {
          this.setState({
            render: (
              <>
                <div id="addProduct">
                  <AddProduct />
                </div>
                <div id="productTable">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Initial Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.products.map(product => {
                        return (
                          <tr>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.initial_date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </>
            )
          });
        }
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.checkauth(this.props.userInfo.id);
    serviceProduct
      .getAll()
      .then(res => {
        this.setState({ products: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    // return <React.Fragment>{this.state.render}</React.Fragment>;
    return (
      <React.Fragment>
        <>
          <div id="addProduct">
            <AddProduct />
          </div>
          <div id="productTable">
            <Table striped bordered hover>
              <thead>
                <caption>capppp</caption>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Initial Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.map(product => {
                  return (
                    <tr>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.initial_date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <AllWinner></AllWinner>
        </>
      </React.Fragment>
    );
  }
}
export default Admin;
