import React, { useState, useEffect, Fragment } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Projects = () => {

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [projectName, setName] = useState('')
  const [projectDescription, setDescription] = useState('')
  const [projectAvailability, setAvailability] = useState(0)

  const [editProjectId, setEditId] = useState('')
  const [editProjectName, setEditName] = useState('')
  const [editProjectDescription, setEditDescription] = useState('')
  const [editProjectAvailability, setEditAvailability] = useState(0)

  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios.get('https://localhost:7132/api/Projects')
      .then((result) => {
        setData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleEdit = (id) => {
    handleShow()
    axios.get(`https://localhost:7132/api/Projects/${id}`)
    .then((result) =>  {
      setEditName(result.data.projectName)
      setEditDescription(result.data.projectDescription)
      setEditAvailability(result.data.projectAvailability)
      setEditId(id)
    })
    .catch((error) => {
      toast.error(error)
    })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you wish to delete this project?') === true) {
      axios.delete(`https://localhost:7132/api/Projects/${id}`)
      .then((result) =>  {
        if(result.status >= 200 && result.status <= 210)
        {
          toast.success('Project has been deleted')
          getData()
        }
      }).catch((error) => {
        toast.error(error)
      })
    }
  }

  const handleUpdate = () => {
    const url = `https://localhost:7132/api/Projects/${editProjectId}`
    const data = {
      "id": editProjectId, 
      "projectName": editProjectName,
      "projectDescription": editProjectDescription,
      "projectCategoryId": 1,
      "projectCategoryName": 'Music',
      "projectAvailability": editProjectAvailability
    }

    axios.put(url, data)
    .then((result) => {
      getData()
      clear()
      toast.success('Project has been edited')
    }).catch((error) => {
      toast.error(error)
    })
  }

  const clear = () => {
    setName('')
    setDescription('')
    setAvailability(0)
    setEditName('')
    setEditDescription('')
    setEditAvailability(0)
    setEditId('')
  }

  const handleAvailabilityChange = (e) => {
    if(e.target.checked)
    {
      setAvailability(1)
    }
    else
    {
      setAvailability(0)
    }
  }

  const handleEditAvailabilityChange = (e) => {
    if(e.target.checked)
    {
      setEditAvailability(1)
    }
    else
    {
      setEditAvailability(0)
    } 
  }

  const handleSave = () => {
    const url = 'https://localhost:7132/api/Projects'
    const data = {
      "projectName": projectName,
      "projectDescription": projectDescription,
      "projectCategoryId": 1,
      "projectCategoryName": 'Music',
      "projectAvailability": projectAvailability
    }

    axios.post(url, data)
    .then((result) => {
      getData()
      clear()
      toast.success('Project has been added')
    })
    .catch((error) => {
      toast.error(error)
    })
  }

  return (
    <Fragment>
      <ToastContainer/>
      <Container>
        <Row>
          <Col>
            <input type='text' className='form-control' placeholder='Project Name'
              value = {projectName} onChange = {(e) => setName(e.target.value)} />
          </Col>
          <Col>
            <input type='text' className='form-control' placeholder='Project Description'
              value = {projectDescription} onChange = {(e) => setDescription(e.target.value)} />
          </Col>
          <Col>
            <input type='checkbox'
              checked = {projectAvailability === 1 ? true : false}
              onChange = {(e) => handleAvailabilityChange(e)} value = {projectAvailability} />
            <label>Make Public</label>
          </Col>
          <Col>
            <button className = "btn btn-primary" onClick = {() => handleSave()}>Submit</button>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data && data.length > 0 ?
              data.map((item, index) => {
                return (
                  <tr key = {index}>
                    <td>{index + 1}</td>
                    <td>{item.projectName}</td>
                    <td>{item.projectDescription}</td>
                    <td>{item.projectCategoryName}</td>
                    <td>{item.projectIsAvailable}</td>
                    <td colSpan={2}>
                      <button className = "btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                      <button className = "btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
              :
              "Loading..."
          }
        </tbody>
      </Table>
      <Modal show = {show} onHide = {handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input type = 'text' className = 'form-control' placeholder = 'Project Name'
                value = {editProjectName} onChange={(e) => setEditName(e.target.value)} />
            </Col>
            <Col>
              <input type = 'text' className = 'form-control' placeholder = 'Project Description'
                value = {editProjectDescription} onChange = {(e) => setEditDescription(e.target.value)} />
            </Col>
            <Col>
              <input type = 'checkbox'
                checked = {editProjectAvailability === 1 ? true : false}
                onChange = {(e) => handleEditAvailabilityChange(e)} value = {editProjectAvailability} />
              <label>Make Public</label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant = 'secondary' onClick = {handleClose}>
            Close
          </Button>
          <Button variant = 'primary' onClick = {handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default Projects