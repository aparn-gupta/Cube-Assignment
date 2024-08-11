import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Cards from './cards';
import Imagecard from './Imagecard';



//make this useeffect try and catch



function Main() {

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


interface UserNames {
        name : string
  }

  interface UserTitles {
    title : string
}

interface UserAddresses {
  body : string
}


const [allimages, setImages] = useState<PexelsImage[]>([])
const [allNames, setallNames] = useState<UserNames[]>([])
const [allTitles, setallTitles] = useState<UserTitles[]>([])
const [allAddresses, setallAddresses] = useState<UserAddresses[]>([])
const [pageNo, setPage] = useState(1)
const [cardIndex, setCardIndex] = useState(0)
const [count, setCount]  = useState(1)
const [sn, setSn] = useState(0)




useEffect(() => {
  axios.get("https://jsonplaceholder.typicode.com/comments")
   .then(res => 
  {
    const userName = res.data
    console.log(userName[2].name)

    setallNames(userName)
// allNames.map((item) => {
//   console.log(item.name)

// } )
     
  }
  )
}, [])



useEffect(() => {
  axios.get("https://jsonplaceholder.typicode.com/posts")
   .then(res => 
  {
    const userTitle = res.data
    console.log(userTitle[2].title)

    setallTitles(userTitle)

    const address = res.data
    console.log(address[2].body)
setallAddresses(address)
//     allTitles.map((item) => {
//   console.log(item.title)

// } )
     
  }
  )
}, [])








// useEffect(() => {
//   axios.get("https://jsonplaceholder.typicode.com/posts")
//   .then(res => 
//   {
//     const address = res.data
//     console.log(address[2].body)
// setallAddresses(address)
// allAddresses.map((item) => {
//   console.log(item.body)

// } )

     
//   }
//   )

// }, [])





useEffect(() => {
  const fetchmyImages = async () => {
    const res = await axios.get("https://api.pexels.com/v1/curated", {
      headers: {
        Authorization: "ptiZk19t1IKkLdO4kx5f4iKEMCNjyKEZWdgApr0RPispuXi9nmrT4bd6"
      },
      params: {
        per_page: 80,
        page: 10
      }
    })
  
  
    setImages(res.data.photos[0].src.medium)

    let images = res.data.photos
   
    setImages(images) 

    
    
  }

    fetchmyImages()

}, [count])

let newImageArray = allimages.slice(sn, sn + 8)

  return (
    <div className="App">


<div className='container1'>
  
<div className='customer-container' >
     {allTitles.map((item, index) =>  
      <div onClick = {() => {setCardIndex(index)
        setSn((prev) => prev + 9 )
      }}  > <Cards    key =  {index}  name =  {allNames[index].name}     title  =  {item.title}    id = {index}   /> </div> )}
     </div>
   


  
     
     <div className='imagecard-container'>
       <Imagecard  userName =  {allNames[cardIndex].name}  
         title  =  {allTitles[cardIndex].title} 
         address =  {allAddresses[cardIndex].body} 
        />


{newImageArray.map((item, index) => 
     <img className='photos' src=  {item.src.medium} key = {index} />)}
     </div>
</div>
   

    </div>
    
   
  );
}

export default Main;
