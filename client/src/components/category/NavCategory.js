import React from "react";

import { Button, Form, Alert, Modal } from "react-bootstrap";
import categoryService from "../../services/categoryService.js";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import { Navbar, Nav, NavDropdown, FormControl } from "react-bootstrap";

class NavCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      bool: false
    };
  }
  componentDidMount() {
    this.hundleGetAllCategories();
  }
  hundleGetAllCategories() {
    categoryService.getAllCategories().then(res => {
      this.setState({
        categoryList: res.data
      });
    });
  }

  handleClickCategory(category) {
    categoryService.displayByCategory(category).then(res => {
      this.props.onClick(res.data);
    });
  }

  render() {
    return (
      <div>
        {/* navbar category change the sticky top */}
        <Navbar sticky="top">
          <Navbar.Brand>Category</Navbar.Brand>
          <Nav className="mr-auto">
            {this.state.categoryList.map(cat => {
              return (
                <div>
                  {/* <Link onClick={(e) => { this.handleClickCategory(cat.name) }} >{cat.name}</Link> */}
                  {/* <Link to='/' > />555 </Link> */}

                  <Link
                    to="/"
                    onClick={e => {
                      this.handleClickCategory(cat.name);
                    }}
                  >
                    {" "}
                    {cat.name}{" "}
                  </Link>
                </div>
              );
            })}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavCategory;
//
