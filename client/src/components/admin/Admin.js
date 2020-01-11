import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import AddProduct from '../Product/addProduct.js';
import API from '../../services/productService.js';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        API.getAll()
            .then(res => { this.setState({ products: res.data }) }
            ).then(res => { console.log('hello', this.state.products) }
            )


    }

    render() {
        return (
            <React.Fragment className="admin">
                <div id="addProduct">
                    <AddProduct></AddProduct>
                </div>
                <div id="productTable">
                    <BootstrapTable data={this.state.products} >
                        <TableHeaderColumn isKey dataField='_id'>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='initial_date'>Start Date</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </React.Fragment>

        )
    }
}

export default Admin;