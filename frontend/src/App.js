import './App.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col'
import { useEffect, useState } from 'react';
import axios from 'axios'

function VendorForm({setVendorId}) {
  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const vendorId = formData.get('vendorId')
    console.log(vendorId)
    setVendorId(vendorId)
  }

  return (
    <Form onSubmit={handleSubmit} >
      <Row>
        <Col>
          <Form.Group controlId='vendorForm'>
            <Form.Control type='text' placeholder='Enter vendorId' name='vendorId'/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Button variant='primary' type='submit' >
            Submit
          </Button>
        </Col>
      </Row>
      
    </Form>
  )
}

function ProductTable({salesData}) {
  const tableBody = salesData.map((element, index) => {
    return (
      <tr key={index} >
        <td>{element.product[0].name}</td>
        <td>{element.total_sales}</td>
      </tr>
    )
  })

  return (
    <Table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Total Sales</th>
        </tr>
      </thead>
      <tbody>
        {tableBody}
      </tbody>

    </Table>
  )
}

function App() {
  const [vendorId, setVendorId] = useState()
  const [productSales, setProductSales] = useState([]) 
  
  useEffect( () => {
    //to do: get connection constants from a config file.
    if (vendorId) {
      axios.get("http://localhost:8080/totalproductsales?vendorId=" + vendorId).then( (response) => {
        console.log(response.data)
        setProductSales(response.data)
      } ).catch((error)=>{
        console.log(error)
      })
    }
    
  }, [vendorId] )

  return (
    <div className="justify-content-center mx-5">
        <VendorForm setVendorId={setVendorId }/>
        <ProductTable salesData={productSales}/>
    </div>
  );
}

export default App;
