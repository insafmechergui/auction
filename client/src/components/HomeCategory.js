
import React from 'react';
import MiniaturProduct from './Product/MiniaturProduct'
import Product from './Product/Product'
import queryString from "query-string";
import productServices from "../services/productService";
import { Button, Form, Card, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class HomeCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []

        }
    }
    componentWillMount() {
        console.log('rrrrrr')
        const { id } = queryString.parse(window.location.search);
        console.log(id)
    }
    componentDidMount() {
        if (this.props.products.length > 0 && this.props.products !== undefined) {
            this.setState({
                products: this.props.products
            })
        } else {
            productServices.getAll().then((res) => {

                this.setState({
                    products: res.data
                })
            })
        }
    }

    componentWillReceiveProps(newProps) {

        console.log('newprops===>', newProps)
        this.setState({ products: newProps.products })
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

export default HomeCategory;