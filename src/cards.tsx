import React from "react";

interface Cardsprops {
  name: string;

  title: string;
  id: Number;
}

const Cards: React.FC<Cardsprops> = ({ name, title, id }) => {
  return (
    <div tabIndex={0} className="cards" >
      <h2 className="bold"> {name}</h2>
      <br />

      {title}
    </div>
  );
};

export default Cards;
