import React from "react";

import { Button, Form, Alert, Modal } from "react-bootstrap";
import productService from "../../services/productService";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Link
} from "react-router-dom";
import { Navbar, Nav, NavDropdown, FormControl } from "react-bootstrap";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            text: false
        };
    }
    componentDidMount() {

    }

    onChange(e) {
        this.setState({
            text: e.target.value
        })
    }
    // hundleGetAllCategories() {
    //     categoryService.getAllCategories().then(res => {
    //         this.setState({
    //             categoryList: res.data
    //         });
    //     });
    // }

    filterProduct(e) {
        e.preventDefault();
        productService.search(this.state.text).then(res => {
            console.log(res.data)
            this.props.onClick(res.data)
        })
    }


    render() {
        return (

            <Form inline>
                <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={e => {
                        this.onChange(e);
                    }}
                />
                <Button
                    variant="outline-success"
                    onClick={e => this.filterProduct(e)}
                >
                    Search
                </Button>
            </Form>
        )
    }
}
export default Search;