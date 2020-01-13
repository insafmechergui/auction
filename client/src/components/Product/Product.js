import React from "react";

import productServices from "../../services/productService";
import queryString from "query-string";
import { Row, Col, Carousel, Container } from "react-bootstrap";

import Auction from "./Auction";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    const { id } = queryString.parse(window.location.search);
    productServices.getOne(id).then(res => {
      this.setState({
        product: res.data
      });
    });
  }

  render() {
    return (
      <Row className="containerProduct">
        <Col>
          <div className="slides">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="slide1.webp"
                  alt="First slide"
                />
                <Carousel.Caption>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="slide2.webp"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3></h3>
                  <p>

                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </Col>
        <Auction
          userInfo={this.props.userInfo}
          product={this.state.product}
          handleShow={this.props.handleShow}
        ></Auction>
      </Row>
    );
  }
}
export default Product;
