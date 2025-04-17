import axios from 'axios';
import React, { useState } from 'react'
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';


const Note = ({note , index , displayNote}:any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function updateNote (id :any ){

  //   axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}` ,{
  //     title : note.title ,
  //     content : note.content
  //   } ,
  //   {
  //     headers : {
  //       token : `3b8ny__${localStorage.getItem("token")}`
  //     }
  //   }
  //  ).then(({data})=>{
  //   console.log(data);
    
  //  }).catch((error)=>{
  //   console.log(error.response.data);
    
  //  })
  //   console.log("update");
    
  // }

  const updateNote =  (values : any )=>{
    axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}` , values , {
     headers:{
       token : `3b8ny__${localStorage.getItem("token")}`
     }
     
   }).then(({data})=>{
 displayNote()

     console.log(data);

     
   }).catch((err)=>{
     console.log(err);
     
   }).finally(
     ()=>handleClose()
   )

   // console.log(data);
   
   console.log("addNote");
   
 }
 const {values , handleChange ,  handleSubmit} = useFormik({
   initialValues :{
     title : note.title || ""  ,
     content :  note.content || "" 
   } ,
   onSubmit : updateNote
 })

  function removeNote(id : any){
    axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}` ,{
      headers:{
        token:`3b8ny__${localStorage.getItem("token")}`
      }
    }).then(({data})=>{
      console.log(data);
      displayNote()
      
    })
    console.log(note._id);
    
    // console.log("remove");
    
  }
    
  return (
   <>
     <Card style={{ width: '18rem' }}>
      {/* <Card.Body className='justify-content-center d-flex flex-column align-items-center m-auto text-center' >
         
        
        
        <Button variant="primary">Go somewhere</Button>
      </Card.Body> */}
      <ListGroup className="list-group-flush ">
        <ListGroup.Item className='text-center text-success text-capitalize'><Card.Title >{note?.title}</Card.Title></ListGroup.Item>
        <ListGroup.Item><Card.Text > {note?.content}</Card.Text></ListGroup.Item>
      </ListGroup>
      <div className='d-flex justify-content-around my-3'>
      <Button variant="outline-primary" onClick={()=>handleShow()}><i className='fas fa-pen'></i></Button>
      <Button variant="outline-danger" onClick={()=>removeNote(note._id)}><i className='fas fa-trash'></i></Button>
      </div>
    </Card>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>My Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
             <input  name='title' value={values.title}  onChange={handleChange} type="text"  className='form-control mb-4' placeholder='Tittle'  />
             <textarea name="content" value={values.content} onChange={handleChange} className='form-control' placeholder='content' id="noteBody"></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' onClick={handleSubmit} variant="primary ">Update</Button>
        </Modal.Footer>
      </Modal>
   </>
  )
}

export default Note

// 01100589283