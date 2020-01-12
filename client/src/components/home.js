import React from "react";
import MiniaturProduct from "./Product/MiniaturProduct";
import Product from "./Product/Product";

import AddProduct from "./Product/addProduct";

import queryString from "query-string";

import productServices from "../services/productService";
import { Button, Form, Card, Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentWillMount() {
    const { id } = queryString.parse(window.location.search);
  }
  componentDidMount() {
    if (this.props.products !== undefined && this.props.products.length > 0) {
      this.setState({
        products: this.props.products
      });
    } else {
      productServices.getAll().then(res => {
        this.setState({
          products: res.data
        });
      });
    }
  }

  // componentWillReceiveProps(newProps) {
  //   this.setState({ products: newProps.products });
  // }

  render() {
    return (
      <div style={{ backgroundColor: 'red' }}>
        <Container >
          {this.state.products.map(product => {
            return (
              // <MiniaturProduct product={product} />
              <Link to={`/Product?id=${product._id}`}>
                {" "}
                <MiniaturProduct product={product} />{" "}
              </Link>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default Home;
