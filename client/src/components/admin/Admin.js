import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import AddProduct from '../Product/addProduct.js'
// import { getAll } from '..\..\services\productService.js'

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    // componentDidMount() {
    //     getA
    // }

    render() {
        return (
            <React.Fragment className="admin">
                <div id="addProduct">
                    <AddProduct></AddProduct>
                </div>
                <div id="productTable">

                </div>
            </React.Fragment>

        )
    }
}

export default Admin;