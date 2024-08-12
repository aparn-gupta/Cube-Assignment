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
          <span className="bold margin-bottom"> TITLE: </span> {title}
          <br />
          <br />
          <span className="bold">ADDRESS: </span> {address}
        </div>
      </div>
    </div>
  );
};

export default Imagecard;
