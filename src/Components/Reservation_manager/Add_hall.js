import './Add_hall.css';
import Nav from './Nav';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Add_hall() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/meals')
      .then((response) => {
        setCardsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  };

  console.log('cardsData:', cardsData);

  return (
    <div>
      <Nav />
      <div className='card-container'>
        {cardsData.map((card, index) => (
          <div className='card' key={index}>
            <h2>{card.Name}</h2>
            <p>{card.Size}</p>
            <img
              src={`data:image/png;base64,${arrayBufferToBase64(card.Image.data)}`}
              alt="Meal"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
