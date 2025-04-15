import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Note from '../../components/Note/Note';
// import displayNote from '../../helpers/displayNote';

const Home = () => {

  const [show, setShow] = useState(false);
  const [notes , setNotes] = useState(null)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const displayNote = async ()=>{

    const{data} = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes` , {
        headers : {
              token : `3b8ny__${localStorage.getItem("token")}`

        }
        
    })
    console.log(data);
    setNotes(data.notes)

} 
useEffect(()=>{
  displayNote()
} , [])
  const addNote =  (values : any)=>{
     axios.post(`https://note-sigma-black.vercel.app/api/v1/notes` , values , {
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
      title : "" ,
      content : ""
    } ,
    onSubmit : addNote
  })

 

  return (
    <>
     <div className='text-end p-5'>
     <Button className='me-auto' variant="primary" onClick={handleShow}>
        Add Note +
      </Button>
     </div>

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
          <Button type='submit' onClick={handleSubmit} variant="primary ">Add</Button>
        </Modal.Footer>
      </Modal>
      

      {
        notes?.map((note)=><Note key={note._id} note={note} />)
      }
    </>
  )
}

export default Home