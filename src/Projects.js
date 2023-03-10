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
  const [projectAvailability, setAvailability] = useState(false)

  const [editProjectId, setEditId] = useState('')
  const [editProjectName, setEditName] = useState('')
  const [editProjectDescription, setEditDescription] = useState('')
  const [editProjectAvailability, setEditAvailability] = useState(false)

  const projectData = [
    {
      projectId: 1,
      projectName: 'Final Fantasy XIV',
      projectDescription: 'World-Class MMORPG',
      projectCategoryId: 1,
      projectCategoryName: 'Games',
      projectIsAvailable: 1
    },
    {
      projectId: 2,
      projectName: 'Scream',
      projectDescription: 'Rock song doubling as a boss theme',
      projectCategoryId: 2,
      projectCategoryName: 'Music',
      projectIsAvailable: 1
    },
    {
      projectId: 3,
      projectName: 'Hollow Knight',
      projectDescription: 'Only the best game ever made',
      projectCategoryId: 1,
      projectCategoryName: 'Games',
      projectIsAvailable: 1
    }
  ]

  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios.get('https://localhost:7132/api/Projects')
      .then((result) =>{
        setData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleEdit = (id) => {
    handleShow()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you wish to delete this project?') == true) {
      alert(id)
    }
  }

  const handleUpdate = () => {

  }

  const handleSave = () => {
    const url = 'https://localhost:7132/api/Projects'
    const data = {
      "projectId": 0,
      "projectName": projectName,
      "projectDescription": projectDescription,
      "projectCategoryId": 1,
      "projectCategoryName": 1,
      "projectAvailability": projectAvailability
    }

    axios.post(url, data)
    .then((result) => {
      getData()
      clear()
      toast.success('Project has been added')
    })
  }

  const clear = () => {
    setName('')
    setDescription('')
    setAvailability(0)
    setEditName('')
    setEditDescription('')
    setEditAvailability(0)
  }

  const handleActiveChange = (e) => {
    if(e.target.checked)
    {
      setAvailability(true)
    }
    else
    {
      setAvailability(false)
    }
  }

  const handleEditActiveChange = (e) => {
    if(e.target.checked)
    {
      setEditAvailability(true)
    }
    else
    {
      setEditAvailability(false)
    }
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
              checked = {projectAvailability == 1 ? true : false}
              onChange = {(e) => handleActiveChange(e)} value = {projectAvailability} />
            <label>projectIsAvailable</label>
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
            <th>projectName</th>
            <th>projectDescription</th>
            <th>projectCategoryName</th>
            <th>projectCategoryAvailability</th>
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
                      <button className = "btn btn-primary" onClick={() => handleEdit(item.projectId)}>Edit</button> &nbsp;
                      <button className = "btn btn-danger" onClick={() => handleDelete(item.projectId)}>Delete</button>
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
                checked = {editProjectAvailability == 1 ? true : false}
                onChange = {(e) => handleEditActiveChange(e)} value = {editProjectAvailability} />
              <label>projectIsAvailable</label>
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