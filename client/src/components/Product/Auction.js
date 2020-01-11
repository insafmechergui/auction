import React from "react";
import productServices from "../../services/productService";
import auctionServices from "../../services/auctionServices";
import ReactDOM from "react-dom";
import {
  Card,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  Accordion
} from "react-bootstrap";
import Countdown from "react-countdown-now";
import openSocket from "socket.io-client";

class Auction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      auctionPrice: 0,
      history: [],
      socket: openSocket("http://localhost:5000")
    };
    this.state.socket.on("new-auc", auc => {
      if (auc._id === this.state.product._id) {
        this.setState({ history: auc.participants });
      }
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      product: newProps.product,
      history: newProps.product.participants,
      userInfo: newProps.userInfo,
      handleShow: newProps.handleShow
    });
  }

  testLogIn() {
    if (!this.state.userInfo.id || !this.state.userInfo.id) {
      this.state.handleShow("Login");
      return false;
    }
    return true;
  }

  handleAuction(fastAuction) {
    if (this.testLogIn()) {
      var price =
        fastAuction + this.state.product.last_auction_price ||
        this.state.auctionPrice;
      this.setState({ auctionPrice: 0 });

      if (price > this.state.product.last_auction_price) {
        auctionServices
          .updateAuction(
            this.state.product._id,
            price,
            this.props.userInfo.id,
            Date.now()
          )
          .then(res => {
            this.setState({
              product: res.data,
              history: res.data.participants
            });
            this.state.socket.emit("new-auc", res.data);
          });
      } else {
        alert("noooooooooooooooooooooooo");
      }
    }
  }

  render() {
    return (
      <div>
        <Card bg="light" className="auction">
          <Card.Body>
            <Card.Title className="text-center">
              <Card.Text>Value {this.state.product.value} DT</Card.Text>
            </Card.Title>
            <Card.Header className="text-center timer">
              <Countdown
                date={new Date(this.state.product.initil_date).getTime() + this.state.product.duration}
                onComplete={() => {
                  this.setState({ timer: "done" });
                }}
              />
            </Card.Header>
            <br />
            <Row>
              <Col className="text-left auctionPrice">
                <Card.Text>
                  {" "}
                  {this.state.product.last_auction_price} DT
                </Card.Text>
              </Col>
              <Col className="text-right">
                <Card.Text>Name.M </Card.Text>
              </Col>
            </Row>

            <Row>
              <Col className="text-left">
                <Card.Text>
                  {" "}
                  <small className="text-muted"> 100 dt per person </small>
                </Card.Text>
              </Col>
              <small className="text-muted"> 1/06/2020 </small>
            </Row>

            <Row>
              <Col className="text-center">
                <Card.Text>
                  <small className="text-muted text-center">
                    {" "}
                    administrative fees 10 dt
                  </small>
                </Card.Text>
              </Col>
            </Row>

            <Row>
              <Col className="text-left">
                <Card.Text>Fast auction</Card.Text>
              </Col>
            </Row>

            <Row className="item-left">
              <Col md={2}>
                <Button
                  onClick={() => {
                    this.handleAuction(1);
                  }}
                  variant="warning"
                >
                  <Card.Text>1dt</Card.Text>
                </Button>{" "}
              </Col>
              <Col md={2}>
                <Button
                  onClick={() => {
                    this.handleAuction(10);
                  }}
                  variant="warning"
                >
                  <Card.Text>10dt</Card.Text>
                </Button>
              </Col>
              <Col md={2}>
                <Button
                  onClick={() => {
                    this.handleAuction(50);
                  }}
                  variant="warning"
                >
                  <Card.Text>50dt</Card.Text>
                </Button>
              </Col>
              <Col md={2}>
                <Button
                  onClick={() => {
                    this.handleAuction(100);
                  }}
                  variant="warning"
                >
                  <Card.Text>100dt</Card.Text>
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={6}>
                <InputGroup>
                  <Form.Control
                    type="Number"
                    placeholder="0"
                    aria-describedby="dt"
                    min={this.state.product.last_auction_price}
                    value={this.state.auctionPrice}
                    onChange={e =>
                      this.setState({ auctionPrice: e.target.value })
                    }
                  />
                  <InputGroup.Append>
                    <InputGroup.Text id="dt">DT</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
              <Col>
                {" "}
                <Button onClick={() => this.handleAuction()} variant="success">
                  Auctioning
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Accordion defaultActiveKey="0" className="auctionHistory">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              History of Auctions
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {this.state.history.map(auction => {
                  return (
                    <Row>
                      <Col className="historyPrice text-left">
                        {auction.price}
                      </Col>
                      <Col>
                        <Row className="text-right">{auction.user.name}</Row>
                        <small>
                          <Row>
                            {new Date(auction.date).getFullYear() +
                              "-" +
                              (new Date(auction.date).getMonth() + 1) +
                              "-" +
                              new Date(auction.date).getDate() +
                              " " +
                              new Date(auction.date).getHours() +
                              ":" +
                              new Date(auction.date).getMinutes() +
                              ":" +
                              new Date(auction.date).getSeconds()}
                          </Row>
                        </small>
                        <br />
                      </Col>
                    </Row>
                  );
                })}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}
export default Auction;
