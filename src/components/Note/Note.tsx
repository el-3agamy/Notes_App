import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const Note = ({note}:any) => {

    
  return (
   <>
     <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{note?.title}</Card.Title>
        <Card.Text>
         {note?.content}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
   </>
  )
}

export default Note

// 01100589283