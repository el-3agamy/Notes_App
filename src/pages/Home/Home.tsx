import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Note from '../../components/Note/Note';
// import displayNote from '../../helpers/displayNote';

const Home = () => {

  const [notes , setNotes] = useState(null) ;
  const [noNotes , setNoNotes] = useState(false) ;
  const [loading , setLoading] = useState(false) ;
  
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const displayNote = async ()=>{
setLoading(true)
     axios.get(`https://note-sigma-black.vercel.app/api/v1/notes` , {
        headers : {
              token : `3b8ny__${localStorage.getItem("token")}`

        }
        
    }).then(({data})=>{
      setLoading(true)
      console.log(data);
      setNotes(data.notes) ;
      setNoNotes(false)
    }).catch((err)=>{
      setNoNotes(true)
      
    }).finally(
     ()=>{
      setLoading(false)
     }
    )
    

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
    {
      loading  === true?  
      <div className='w-100 vh-100 bg-info-subtle d-flex justify-content-center align-items-center '>
<i className='fas fa-spinner fa-spin'></i>

      </div>
      :  

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
      

      <div className=" row">
        <div className='md-4 d-flex'>
       {
        noNotes == true ? <p>Theres No notes</p> :  <>
        
        {
          notes?.map((note , index)=><Note key={note._id} note={note} index={index} displayNote={displayNote}/>)
        }
        </>
       }
        </div>
      </div>
      </>
    }
    </>
  )
}

export default Home