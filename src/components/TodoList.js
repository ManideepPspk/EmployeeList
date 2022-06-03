import React from 'react'
import {
    Card, Row, Col,
  } from 'react-bootstrap';
import './todos.scss';

const TodoList = ({todolist,deleteHandler}) => {
    console.log(todolist,"esge")
    return (
        <div>
            {todolist.map((todo,index) =>
            <Card className="mt-2 cardbodystyle border-0" key={index}>
            <Card.Body >
  
              <Row className="mt-2 mb-4 mr-2 ml-2">
                <Col xs="5" sm={5}>
                <Row className='texxt head'>Name</Row>
                <Row className='texxt val'>{todo.name}</Row>
  
                </Col>
                <Col xs="6" sm={6}>
                <Row className='texxt head'>Contact Number</Row>
                <Row className='texxt val'>{todo.contactnumber}</Row>
                </Col>
              </Row>
              <Row className="mt-4 mb-1 mr-2 ml-2">
                <Col xs="9" sm={9}>
                <Row className='texxt head'>Email</Row>
                <Row className='texxt val'>{todo.email}</Row>
  
                </Col>
                <Col className="">
                    <button className='btn-style float-right'  onClick={() => deleteHandler(index)}>Delete</button></Col>
              </Row>
            </Card.Body>
          </Card>
            )}
        </div>
    )
}

export default TodoList