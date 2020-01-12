import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import AddProduct from "../Product/addProduct.js";
import adminServices from "../../services/adminServices";

// import { getAll } from '..\..\services\productService.js'

class Admin extends React.Component {
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
    this.checkauth(this.props.userInfo.id);
  }

  // componentWillReceiveProps(newprops) {
  //   console.log("-------------------------------", newprops);
  // }
  render() {
    return (
      <React.Fragment className="admin">
        <div id="addProduct">
          <AddProduct></AddProduct>
        </div>
        <div id="productTable"></div>
      </React.Fragment>
    );
  }
}

export default Admin;
