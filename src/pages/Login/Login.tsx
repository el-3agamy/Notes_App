import React, {  useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom';
// import { authContext } from '../../contexts/AuthContext';

const Login = () => {
const [errorMsg , setErrorMsg] = useState('') ;
const [loading , setLoading] = useState(false) ;
const navigate = useNavigate() ;
// const {isLogged , setIsLogged} : any = useContext(authContext)
  const validationSchema = Yup.object().shape({
    email : Yup.string().required("Emial is required").email("Invaild Email") ,
    password : Yup.string().required("Password is required")
  })

const onSubmit =  (values : any)=>{
  // setErrorMsg('')
  setLoading(true)
    axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn` , values)
    .then(({data})=>{
     data.msg === "done"  && navigate("home") 
     localStorage.setItem("token" , (data.token))
      console.log(data);
      
      console.log(values);

    })
    .catch((err)=>{
    setErrorMsg(err.response.data.msg)
      
    })
    .finally(()=>{
  setLoading(false)

    })
  // if (data.msg === "done") {
  //     navigate("home")
  // }else{
  //   setErrorMsg(data.msg)
  // }
  // setLoading(false)
  
} 

  const {values , handleSubmit , handleChange , handleBlur , touched , errors} = useFormik({
    initialValues : {
      email : "" ,
      password : ""
    } ,
    validationSchema ,
    onSubmit
  })
  return (
    <>
      <div className='col-md-6 mx-auto py-5'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" placeholder="Enter email" />
          </Form.Group>
          {errors.email && touched.email && <div className='my-3 bg-danger-subtle p-2 rounded rounded-2'>{errors.email}</div>}

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" placeholder="Password" />
          </Form.Group>
          {errors.password && touched.password && <div className='my-3 bg-danger-subtle p-2 rounded rounded-2'>{errors.password}</div>}

          <Button variant="primary" type="submit" className='w-100'>
          {loading &&   <i className='fas fa-spinner fa-spin mx-3'></i> }Login
          </Button>
          {errorMsg && <p className='text-danger bg-danger-subtle my-3 p-3 rounded rounded-2 text-center '>{errorMsg.toUpperCase()}</p>}
        </Form>
      </div>
    </>

  )
}

export default Login