import './App.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { BarChart } from '@mui/x-charts/BarChart'

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

function MonthlySalesChart({monthlySalesData}) {
  const xAxisLabels = monthlySalesData.map( (element) => toDateString(element._id.year, element._id.month) )
  const numberOfSales = monthlySalesData.map( (element) => element.total_sales_month ) 

  console.log(xAxisLabels)
  console.log(numberOfSales)

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: xAxisLabels}]}
      series={[{data: numberOfSales}]}
    />
  )
}

function toDateString(year, month) {
  const date = new Date(year, month - 1)
  const monthName = date.toLocaleString('default', { month: 'long' })
  return `${monthName} ${year}`
}

function App() {

  const dummyMonthlySalesData = 
  [{
      "_id": {
          "year": 0,
          "month": 1
      },
      "total_sales_month": 0
  }]
  

  const [vendorId, setVendorId] = useState()
  const [productSales, setProductSales] = useState([])
  const [monthlySales, setMonthlySales] = useState(dummyMonthlySalesData)
  
  useEffect( () => {
    //to do: get connection constants from a config file.
    if (vendorId) {
      axios.get("http://localhost:8080/totalproductsales?vendorId=" + vendorId).then( (response) => {
        console.log(response.data)
        setProductSales(response.data)
      } ).catch((error)=>{
        console.log(error)
      })
      axios.get("http://localhost:8080/monthlysales?vendorId=" + vendorId).then( (response) => {
        console.log(response.data)
        if (response.data.length === 0) {
          setMonthlySales(dummyMonthlySalesData)
        } else {
          setMonthlySales(response.data)
        }
        
      } ).catch((error)=>{
        console.log(error)
      })
    }
    
  }, [vendorId] )

  return (
    <div className="justify-content-center mx-5">
        <div className='vendor-form'>
         <VendorForm setVendorId={setVendorId }/>
        </div>
        <div className='product-table' >
          <ProductTable salesData={productSales}/>
        </div>
        <div className='sales-chart'>
          <MonthlySalesChart monthlySalesData={monthlySales}/>
        </div>
    </div>
  );
}

export default App;
