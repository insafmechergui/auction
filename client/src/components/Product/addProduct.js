import React from 'react';
import { Button, Form } from 'react-bootstrap';
import productService from "../../services/productService.js";
import categoryService from "../../services/categoryService.js";


class AddProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			descreption: '',
			image: '',
			category: '',
			value: '',
			initial_date: '',
			duration: '',

			itemsCategory: []
		}

		this.onChange = this.onChange.bind(this);

	}
	componentDidMount() {
		this.hundleGetAllCategories()

	}

	hundleGetAllCategories() {
		categoryService.getAllCategories().then((res) => {
			console.log('========>', res)
			this.setState({
				itemsCategory: res.data
			})
			console.log(this.state.itemsCategory)
		})
	}
	handleSubmit(event) {
		event.preventDefault();

		productService.getAll(this.state).then(res => {

			console.log('res', res)

		}).catch(err => {
			console.log('myErr', err)
		})

	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (
			<Form onSubmit={(e) => this.handleSubmit(e)}>

				<Form>
					<Form.Group controlId="formGridName">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" placeholder="Product Name" value={this.state.name} onChange={(e) => { this.onChange(e) }} name="name" />
					</Form.Group>

					<Form.Group controlId="exampleForm.ControlDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control as="textarea" rows="3" name="descreption" placeholder="Product Description" value={this.state.descreption} onChange={(e) => { this.onChange(e) }} />
					</Form.Group>
				</Form>

				<Form.Group controlId="formGridPriceValue">
					<Form.Label>Price Value</Form.Label>
					<Form.Control placeholder="Product Price" name="value" type="number" value={this.state.value} onChange={(e) => { this.onChange(e) }} />
				</Form.Group>

				<Form.Group controlId="formGridStartDate">
					<Form.Label>Start Date</Form.Label>
					<Form.Control name="initial_date" type="date" value={this.state.initial_date} onChange={(e) => { this.onChange(e) }} />
				</Form.Group>

				<Form>
					<Form.Group controlId="exampleForm.ControlImage">
						<Form.Label>Image</Form.Label>
						<Form.Control name="image" type="text" value={this.state.image} onChange={(e) => { this.onChange(e) }} placeholder="image" />
					</Form.Group>

					<Form.Group controlId="exampleForm.ControlImage">
						<Form.Label>Duration</Form.Label>
						<Form.Control name="duration" type="text" value={this.state.duration} onChange={(e) => { this.onChange(e) }} placeholder="duration" />
					</Form.Group>
				</Form>

				<Form.Group controlId="formGridState">
					<Form.Label>Category</Form.Label>
					<Form.Control as="select">
						<option>Choose...</option>
						{this.state.itemsCategory.map((cat) => {
							return (
								<option>{cat.name}</option>
							)
						})}
					</Form.Control>
					{/* <Form.Control type="text" name="category" value={this.state.category} onChange={(e) => {this.onChange(e)}} placeholder="category"/> */}

					{/* <Form.Control as="select" name="category" value={this.state.category} onChange={(e) => {this.onChange(e)}}>
									<option>cat1</option>
									<option>cat2</option>
								</Form.Control> */}
				</Form.Group>

				{/* <Form.Row>
							<Form.Group  controlId="formGridCategory">
							<Form.Label>Category</Form.Label>
							
							<Form.Control name="category" value={this.state.category} onChange={(e) => {this.onChange(e)}} list="data">
						<datalist id="data">
							<option value="cat1">cat1</option>
							<option value="cat2">cat2</option>
						</datalist>
						<Autosuggest
						datalist={[ 'Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Rev.', 'Prof.' ]}
						placeholder="Choose Category"
						/>
							</Form.Control>
							</Form.Group>
							
							<Form.Group controlId="exampleForm.ControlImage">
								<Form.Label>Image</Form.Label>
								<Form.Control name="image" type="file"/>
							</Form.Group>
						</Form.Row> */}

				<Button variant="primary" type="submit" >
					Add Product
								</Button>
			</Form>
		)
	}
}

export default AddProduct;