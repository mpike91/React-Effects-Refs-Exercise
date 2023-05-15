import { useState, useEffect } from 'react';
import axios from 'axios';
import DrawCardsForm from './DrawCardsForm.js';
import Card from './Card.js';
import './App.css';
import { func } from 'prop-types';

function App() {
  const [deck, setDeck] = useState(null);
  const [displayedCards, setDisplayedCards] = useState([]);

  useEffect(() => {
    async function newDeck() {
      const newDeck = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
      setDeck(newDeck);
    };
    newDeck();
  }, []);

  const draw = () => {
    async function drawCards() {
      const drawCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`);
      setDeck(drawCards);
      // console.log(drawCards);
      drawCards.data.success
        ? setDisplayedCards([...displayedCards, ...drawCards.data.cards.map(card => ({ id: drawCards.data.remaining, image: card.image, style: { width: 200, transform: `rotate(${randDeg()}deg)` } }))])
        : alert("No more cards!");
    }
    drawCards();
  };

  const shuffle = () => {
    setDisplayedCards([]);
    async function shuffleCards() {
      const shuffleCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/shuffle/`);
      console.log(shuffleCards);
      setDeck(shuffleCards);
    }
    shuffleCards();
  }

  const randDeg = () => {
    const rand = Math.floor(Math.random() * 70 - 30);
    return rand;
  }

  return (
    <div className="App">
      <DrawCardsForm deck={deck} draw={draw} shuffle={shuffle} />
      {displayedCards.map(({ id, image, style }) => <Card key={id} src={image} style={style} />)}
    </div>
  );
}

export default App;
