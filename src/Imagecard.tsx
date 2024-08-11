import React from "react";

interface ImagecardProps {
  userName: string;
  title: string;

  address: string;
}

const Imagecard: React.FC<ImagecardProps> = ({ userName, title, address }) => {
  return (
    <div className="imagecard">
      <div className="center-div text-center">
        <div>
          <h2 className="bold "> {userName} Details </h2>
          <span className="bold margin-bottom"> Title: </span> {title}
          <br />
          <span className="bold">Address: </span> {address}
        </div>
      </div>
    </div>
  );
};

export default Imagecard;
