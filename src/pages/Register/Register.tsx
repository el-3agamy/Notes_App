import { useFormik } from 'formik'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

const Register = () => {
  const [errorMsg , setErrorMsg] = useState(null)  ;
  // const [loading , setLoading] = useState(false)
  const navigate: any = useNavigate();

  const onSubmit = async (values: object) => {
    setErrorMsg(null)
    const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
    console.log(values);
    if (data.msg === "done") {
      navigate("/")

    }else{
      
    setErrorMsg(data.msg)
      
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required.").min(3, 'Name must be at least 3 characters.').max(15, "Maximum length is 20 characters ."),
    email: Yup.string().required("Email is required").email("Invaild Email !"),
    password: Yup.string().required("Password is required").matches(/^[A-Z][a-z]{3,5}$/, "Min 4 and max 6 characters, start with uppercase letter"),
    age: Yup.number().min(13, "Age must be 13 or older").max(99, "Max age is 99 years").required("Age is required"),
    phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Only Egyption Number.")
  })
  const formik: any = useFormik({

    initialValues: {
      "name": "",
      "email": "",
      "password": "",
      "age": "",
      "phone": ""
    },
    validationSchema,
    onSubmit
  });
  // console.log(formik);

  return (
    <>
      <div className='col-md-6 mx-auto p-3'>
        <div >
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" placeholder="Enter Your Name" />
            </Form.Group>
            {formik.errors.name && formik.touched.name && <div className='my-3 bg-danger-subtle p-2 rounded rounded-2'>{formik.errors.name}</div>}
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" placeholder="Enter email" />
            </Form.Group>
            {formik.errors.email && formik.touched.email && <div className='my-3 bg-danger-subtle p-2 rounded rounded-2'>{formik.errors.email}</div>}

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" placeholder="Password" />
            </Form.Group>
            {formik.errors.password && formik.touched.password && <div className='my-3 bg-danger-subtle p-2 rounded rounded-2'>{formik.errors.password}</div>}

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Age</Form.Label>
              <Form.Control name='age' value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" placeholder="Enter Your Age" />
            </Form.Group>
            {formik.errors.age && formik.touched.age && <div className='my-3 bg-danger-subtle p-2 rounded rounded-2'>{formik.errors.age}</div>}

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" placeholder="Enter Your Phone" />
            </Form.Group>
            {formik.errors.phone && formik.touched.phone && <div className='my-3 bg-danger-subtle p-2 rounded rounded-2'>{formik.errors.phone}</div>}

            <Button variant="primary" type="submit" className='w-100'>
              Rigester Now
            </Button>
            {errorMsg && <p className='text-danger bg-danger-subtle'>{errorMsg}</p>}
          </Form>
        </div>
      </div>
    </>
  )
}

export default Register