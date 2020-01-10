
import React from 'react';
import MiniaturProduct from './Product/MiniaturProduct'
import Product from './Product/Product'

import productServices from "../services/productService";
import { Button, Form, Card, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        productServices.getAll().then((res) => {

            this.setState({
                products: res.data
            })
        })
    }

    render() {
        return (

            <Container className="home">
                {this.state.products.map((product) => {
                    return (
                        // <MiniaturProduct product={product} />
                        <Link to={`/Product?id=${product._id}`} > <MiniaturProduct product={product} /> </Link>

                    )
                })}
            </Container   >
        )
    }
}

export default Home;


{/* <MiniaturProduct onClick={() => console.log('ok')} product={product}></MiniaturProduct>) */ }



// <Router>

{/* <Route path="/" exact component={Home} ></Route>
                <Route path="/Product" component={Product} /> */}

{/* </Router > */ }