import React from 'react';
import { Button, Form } from 'react-bootstrap';
//import productService from '../services/productService.js';
import axios from 'axios'
class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            value: '',
            startDate: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    handleSubmit = event => {
        axios.post('/api/addProduct', this.state)
            .then(result => {
                if (result) {
                    return result;
                }

            })
            .catch(err => {
                console.log('something happened')
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (

            <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                    <Form.Group controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Product Name" value={this.state.name} onChange={(e) => { this.onChange(e) }} name="name" />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" name="description" placeholder="Product Description" value={this.state.description} onChange={(e) => { this.onChange(e) }} />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridPriceValue">
                    <Form.Label>Price Value</Form.Label>
                    <Form.Control placeholder="Product Price" name="value" type="number" value={this.state.value} onChange={(e) => { this.onChange(e) }} />
                </Form.Group>

                <Form.Group controlId="formGridStartDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control name="startDate" type="initialDate" value={this.state.startDate} onChange={(e) => { this.onChange(e) }} />
                </Form.Group>

                {/* <Form.Row>

				<Form.Group  controlId="formGridCategory">
				<Form.Label>Category</Form.Label>
				<Form.Control >
					<option>cat1</option>
					<option>cat2</option>
				</Form.Control>
				</Form.Group>

				<Form.Group controlId="exampleForm.ControlImage">
          <Form.Label>Image</Form.Label>
          <Form.Control name="image" type="file"/>
        </Form.Group>
			</Form.Row> */}

                <Button variant="primary" type="submit" >
                    Add new Product
			</Button>
            </Form>
        )
    }
}

export default AddProduct;