import React, { useState } from 'react'
import TodoList from './TodoList.js';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Card, Row, Col,
} from 'react-bootstrap';
import './todos.scss';

const Todos = () => {
  const [todos, setTodos] = useState([]);

  let initialValues = {};

  let validationSchemaActual = {
    name: Yup.string()
      .required(''),
    email: Yup.string()
      .required(''),
    contactnumber: Yup.number().required('')
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object(validationSchemaActual),
    onSubmit: (values) => {
      const newTodos = [...todos, values];
      setTodos(newTodos);
    },
    validate: values => {
      let errors = {};
      if (values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email format';
      }
      if (values.contactnumber && !/^[0-9]{10}$/.test(values.contactnumber)) {
        errors.contactnumber = 'Please enter 10 digit number';
    }
      return errors;
    }
  });
  const renderError = (formik, fieldName) => {
    return formik.errors[(fieldName)] ? (
      <span className='mb-1 error-text float-left'>
        {formik.errors[(fieldName)]}
      </span>
    ) : null
  }
  const deleteHandler = (indexValue) => {
    const newTodos = todos.filter((todo, index) => index !== indexValue);
    setTodos(newTodos);
  }
  return (
    <div>
      <Row>
        <Col xs="4" sm={4}></Col>
        <Col xs="4" sm={4}>
          <Card className="mt-2 cardbodystyle border-0">
            <Card.Body >

              <Row className="mt-2 mr-2 ml-2">
                <Col xs="12" sm={12}>
                  <h5 className="float-left">Employee List</h5>

                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mt-2 cardbodystyle border-0">
            <Card.Body >

              <Row className="mt-2 mr-2 ml-2">
                <Col xs="12" sm={12}><form onSubmit={formik.handleSubmit}>
                  <div className='mb-3'>
                    <TextField id="standard-basic-1" label="Name" variant="standard"
                      value={formik.values.name}
                      color="secondary"
                      onChange={(e) => { formik.handleChange(e) }}
                      name='name'
                      required ={formik.values.name?false:true}
                      placeholder='eg. John doe'
                      fullWidth
                    />
                    <div className='mt-1'>{renderError(formik, 'name')}</div>
                  </div>
                  <div className='mb-3'>
                    <TextField
                     type = "email"
                     id="standard-basic" label="Email" variant="standard"
                     color="secondary"
                      value={formik.values.email}
                      onChange={(e) => { formik.handleChange(e) }}
                      name='email'
                      required ={formik.values.email?false:true}
                      placeholder='enter email'
                      fullWidth
                    />
                    <div className='mt-1'>{renderError(formik, 'email')}</div>
                  </div>
                  <div className='mb-3'>
                    <TextField
                    type="number"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      id="standard-basic-2" label="Contact number" variant="standard"
                      color="secondary"
                      value={formik.values.contactnumber}
                      onChange={(e) => { formik.handleChange(e) }}
                      name='contactnumber'
                      required ={formik.values.contactnumber?false:true}
                      placeholder='enter number'
                      fullWidth
                    />
                    <div className='mt-1'>{renderError(formik, 'contactnumber')}</div>
                  </div>
                  <button className='btn-style float-right'  type="submit" value="Add" name="Add">Add</button>
                </form>

                </Col>
              </Row>
            </Card.Body>
          </Card>

          <TodoList todolist={todos} deleteHandler={deleteHandler} />
        </Col>
      </Row>
    </div>
  );
}

export default Todos