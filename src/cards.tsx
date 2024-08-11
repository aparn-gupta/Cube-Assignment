import React from 'react'

interface Cardsprops {
    name: string,
    
    title: string
    id : Number

}


const Cards:React.FC<Cardsprops> = ({name, title, id}) => {
  return (
    <div  className='cards'  onClick={() => console.log(id) }  >
      <h2 className='bold'> {name}</h2>
      <br/>
     
       {title}




    </div>
  )
}

export default Cards
