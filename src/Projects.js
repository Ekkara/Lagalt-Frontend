import React, {useState, useEffect, Fragment} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'

const Projects = () => {

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const projectData = [
        {
            projectId : 1,
            projectName : 'Final Fantasy XIV',
            projectDescription : 'World-Class MMORPG',
            projectCategoryId : 1,
            projectCategoryName: 'Games',
            projectAvailability: 1
        },
        {
            projectId : 2,
            projectName : 'Scream',
            projectDescription : 'Rock song doubling as a boss theme',
            projectCategoryId : 2,
            projectCategoryName: 'Music',
            projectAvailability: 1
        },
        {
            projectId : 3,
            projectName : 'Hollow Knight',
            projectDescription : 'Only the best game ever made',
            projectCategoryId : 1,
            projectCategoryName: 'Games',
            projectAvailability: 1
        }
  ]

  const[data, setData] = useState([])

  useEffect(() => {
      setData(projectData)
  }, [])

  const handleEdit = (id) => {
    handleShow()
  }

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you wish to delete this project?') == true)
     {
       alert(id)
    }
  }

  const handleUpdate = () => {

  }

  return(
    <Fragment>
      <Container>
      <Row>
        <Col>
          <input type = 'text' className = 'form-control' placeholder = 'Project Name'/>
        </Col>
        <Col>
          <input type = 'text' className = 'form-control' placeholder = 'Project Description'/>
        </Col>
        <Col>
          <input type = 'checkbox'/>
          <label>projectAvailability</label>
        </Col>
        <Col>
          <button className="btn btn-primary">projectAvailability</button>
        </Col>
      </Row>
    </Container>
    <br></br>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>projectName</th>
          <th>projectDescription</th>
          <th>projectCategoryName</th>
          <th>projectCategoryAvailability</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.length > 0 ?
          data.map((item, index) =>{
            return(
              <tr key = {index}>
                <td>{index + 1}</td>
                <td>{item.projectName}</td>
                <td>{item.projectDescription}</td>
                <td>{item.projectCategoryName}</td>
                <td>{item.projectAvailability}</td>
                <td colSpan={2}>
                  <button className="btn btn-primary" onClick = {() => handleEdit(item.projectId)}>Edit</button> &nbsp;
                  <button className="btn btn-danger" onClick = {() => handleDelete(item.projectId)}>Delete</button>
                </td>
              </tr>
            )
          })
          :
          "Loading..."
        }
      </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default Projects