import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Cards from "./cards";
import Imagecard from "./Imagecard";


function Main() {
  interface UserEntries {
    name: string;
    body: string;
    email: string;
  }

  interface Image {
    id: number;
    src: {
      original: string;
      medium: string;
    };
  }

  const [allEntries, setallEntries] = useState<UserEntries[]>([]);
  const [allImages, setImages] = useState<Image[]>([]);

  const [cardIndex, setCardIndex] = useState(0);
  const [sn, setSn] = useState(0); //sn is serial number for counting index of the images array
 

  useEffect(() => {
    try {
      axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
        const userName = res.data;

        setallEntries(userName);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const fetchmyImages = async () => {
      const res = await axios.get("https://api.pexels.com/v1/curated", {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
        params: {
          per_page: 80, //pexelsAPI can load 80 images per page in an API call
          page: 2,
        },
      });

      let images = res.data.photos;

      setImages(images);
    };

    fetchmyImages();
  }, []);

  let newImageArray = allImages.slice(1, 9);

  //to keep the images array lopping (not enough images in one call of Pexels Api, multiple calls not allowed)

  if (sn <= 70) {
    newImageArray = allImages.slice(sn, sn + 9);
  } else if (sn > 70) {
    newImageArray = allImages.slice(Math.ceil(sn / 8), Math.ceil(sn / 8) + 9);
  }

  useEffect(() => {
    const changeImages = () => {
      setSn((prev) => prev + 10);
    };

    const interValid = setInterval(changeImages, 10000);
  }, []);

  return (
    <div className="App">
      <div className="heading">
        {" "}
        <h1 className="bold  "> Heading: Our Customers </h1>
      </div>

      <div className="container1">
        <div className="customer-container">
          {allEntries.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setCardIndex(index);
                setSn(index + 1);
              }}
            >
              {" "}
              <Cards
                name={allEntries[index].name}
                title={item.body}
                id={index}
              />{" "}
            </div>
          ))}
        </div>

        <div className="imagecard-container">
          <div>
            {cardIndex < allEntries.length && (
              <Imagecard
                title={allEntries[cardIndex].body}
                address={allEntries[cardIndex].email}
                userName={allEntries[cardIndex].name}
              />
            )}

            <div className="grid-container">
              {newImageArray.map((item, index) => (
                <img className="photos" src={item.src.medium} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
