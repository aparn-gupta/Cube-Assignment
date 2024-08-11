import React from 'react'


interface ImagecardProps {
    userName: string,
    title : string,
    
   
    address: string
}


interface ImageSrc {
    medium: string;
    original: string;
    // Add other sizes if needed
  }
  
  interface PexelsImage {
    id: number;
    src: ImageSrc;
    photographer: string;
    // Add other properties if needed
  }

const Imagecard:React.FC<ImagecardProps> = ({userName, title, address}) => {
  return (
    <div  className='imagecard'>



       <h2 className='bold'> {userName} Details </h2>
        title: {title}
        address: {address}

     
        

      
        
    </div>
  )
}

export default Imagecard
