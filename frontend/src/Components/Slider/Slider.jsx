import React, { useEffect, useState } from 'react';
import './Slider.css';
import reviews from '../Assets/whatTheyThink';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideTransitionInterval = 700; // in ms

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= reviews.length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex(activeIndex + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="aboutUs-slider-container">
      <div className="slides" style={{ transition: `transform ${slideTransitionInterval}ms`, transform: `translate(-${activeIndex * 100}%)` }}>
        {reviews.map((item, i) => {
          return (
            <div key={i} className="slide">
              <div></div>
              <h1>{item.name}</h1>
              <p>{item.review}</p>
            </div>
          );
        })}
      </div>
      <div className="slide-controls">
        <button
          id="prev-btn"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8l-4 4 4 4M16 12H9" />
          </svg>
        </button>
        <button
          id="next-btn"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8l4 4-4 4M8 12h7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;
