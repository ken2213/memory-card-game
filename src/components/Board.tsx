import React, { useEffect, useState } from 'react';

import { cardImages } from "../constants"
import Card from './Card';

interface Cards {
  id: number;
  src: string;
}

const Board = () => {
  const [cards, setCards] = useState<Cards[]>([]);
  const [turns, setTurns] = useState<number>(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [disabled, setDisabled] = useState(false);

  // Shuffle Card
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0);
  }

  // console.log(cards, turns);

  // Handle a choice
  const handleChoice = (card) => {
    // console.log(card);

    // If you click fast enough on a single choice one card,
    // it will automatically reveal the second choice right card...

    //choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

    // This code condition prevents it from happening...
    choiceOne && choiceOne !== card ? setChoiceTwo(card) : setChoiceOne(card);

  }

  // Compare 2 selected cards
  useEffect(() => {

    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        // console.log('those cards match')
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => {
          resetTurn()
        }, 1000);
      }

    }
  }, [choiceOne, choiceTwo])

  console.log(cards);

  // Reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false);
  }

  // Start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <>
      <div className='flex justify-center'>
        <button 
          onClick={shuffleCards}
          className=' text-white bg-cyan-900'
        >
          New game
        </button>
      </div>
      <div className='flex justify-center'>
        <div className=' max-w-4xl mt-[40px] grid grid-cols-[1fr_1fr_1fr_1fr] gap-[20px]'>
          {cards.map(card => (
            <Card 
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      <p>Turns: {turns}</p>
    </>

  )
}

export default Board;