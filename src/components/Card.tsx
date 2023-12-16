import React from "react";

import { cover } from "../assets";
import { styles } from "../utils";

import "./Card.css";

interface CardProps {
  card: {
    id: number;
    src: string
  };
}


const Card: React.FC<CardProps> = ({ card, handleChoice, flipped, disabled }) => {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <div 
      className='card'
      key={card.id}
    >
      <div className={flipped ? "flipped" : ""}>
        <img 
          src={card.src}
          alt='Front of Card'
          className={`front`}
        />
        <img 
          src={cover}
          alt="Back of Card"
          className={`back`}
          onClick={handleClick}
        />
      </div>
    </div>
  )
}

export default Card;