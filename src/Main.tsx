import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Cards from "./cards";
import Imagecard from "./Imagecard";

function Main() {
  interface ImageSrc {
    medium: string;
    original: string;
  }

  interface PexelsImage {
    id: number;
    src: ImageSrc;
    photographer: string;
  }

  interface UserNames {
    name: string;
  }

  interface UserTitles {
    title: string;
    body: string;
  }

  interface UserAddresses {}

  const [allimages, setImages] = useState<PexelsImage[]>([]);
  const [allNames, setallNames] = useState<UserNames[]>([]);
  const [allTitles, setallTitles] = useState<UserTitles[]>([]);
  // const [allAddresses, setallAddresses] = useState<UserAddresses[]>([])
  const [cardIndex, setCardIndex] = useState(0);
  const [sn, setSn] = useState(0); //sn is serial number for counting index of the images array

  useEffect(() => {
    try {
      axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
        const userName = res.data;

        setallNames(userName);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
        const userTitle = res.data;
        setallTitles(userTitle);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const fetchmyImages = async () => {
      const res = await axios.get("https://api.pexels.com/v1/curated", {
        headers: {
          Authorization:
            "ptiZk19t1IKkLdO4kx5f4iKEMCNjyKEZWdgApr0RPispuXi9nmrT4bd6",
        },
        params: {
          per_page: 80, //pexelsAPI can load 80 images per page in an API call
          page: 2,
        },
      });

      setImages(res.data.photos[0].src.medium);

      let images = res.data.photos;

      setImages(images);
    };

    fetchmyImages();
  }, []);

  let newImageArray = allimages.slice(1, 9);

  //to loop through the images array

  if (sn <= 70) {
    newImageArray = allimages.slice(sn, sn + 9);
  }
  if (sn > 70) {
    newImageArray = allimages.slice(sn - 9, sn);
  }

  // const changeImages = () => {
  //   setSn(prev => prev + 1)
  // }

  // setInterval(changeImages, 10000)

  return (
    <div className="App">
      <div className="heading">
        {" "}
        <h1 className="bold  "> Heading: Our Customers </h1>
      </div>

      <div className="container1">
        <div className="customer-container">
          {allTitles.map((item, index) => (
            <div
              onClick={() => {
                setCardIndex(index);
                setSn(index + 1);
              }}
            >
              {" "}
              <Cards
                key={index}
                name={allNames[index].name}
                title={item.title}
                id={index}
              />{" "}
            </div>
          ))}
        </div>

        <div className="imagecard-container">
          <div>
            {cardIndex < allTitles.length && cardIndex < allNames.length && (
              <Imagecard
                title={allTitles[cardIndex].title}
                address={allTitles[cardIndex].body}
                userName={allNames[cardIndex].name}
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
