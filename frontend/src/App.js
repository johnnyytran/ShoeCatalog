import React, { useState, useEffect } from 'react';
import './App.css';
import airMaxFuturaImage from './images/airmaxfutura.png';
import adidas from './images/adidasbackground.png';
import jordan from './images/jordanbackground.png';
import nb from './images/nbbackground.png';
import NikeComponent from './NikeComponent';
import JordanComponent from './JordanComponent';
import AdidasComponent from './AdidasComponent';
import NewBalanceComponent from './NewBalanceComponent'; 

function App() {
  const brands = ['Nike', 'Adidas', 'Jordan', 'New Balance'];
  const [selectedBrandIndex, setSelectedBrandIndex] = useState(0);
  const [showNikeComponent, setShowNikeComponent] = useState(false);
  const [showJordanComponent, setShowJordanComponent] = useState(false);
  const [showAdidasComponent, setShowAdidasComponent] = useState(false);
  const [showNewBalanceComponent, setShowNewBalanceComponent] = useState(false);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedBrandIndex(prevIndex => (prevIndex + 1) % brands.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [brands.length]);

  const handleBrandClick = index => {
    if (index === 0) {
      setShowNikeComponent(true);
    } 
    else if (index === 1) {
      setShowAdidasComponent(true);

    }

    else if (index === 2) { 
      setShowJordanComponent(true);
    } 
    else if(index === 3){
      setShowNewBalanceComponent(true);
    }
    else {
      setShowNikeComponent(false);
      setShowJordanComponent(false);
      setShowAdidasComponent(false);
      setShowNewBalanceComponent(false);
      setSelectedBrandIndex(index);
    }
  };

  const handleBackToHomepage = () => {
    setShowNikeComponent(false);
    setShowJordanComponent(false);
    setShowAdidasComponent(false);
    setShowNewBalanceComponent(false);
  };

  const renderBrandImage = () => {
    switch (brands[selectedBrandIndex]) {
      case 'Nike':
        return <img src={airMaxFuturaImage} alt="" className="sliderImg active" />;
      case 'Adidas':
        return <img src={adidas} alt="" className="sliderImg active" />;
      case 'Jordan':
        return <img src={jordan} alt="" className="sliderImg active" />;
      case 'New Balance':
        return <img src={nb} alt="" className="sliderImg active" />;
      default:
        return null;
    }
  };

  if (showNikeComponent) {
    return <NikeComponent backToHomepage={handleBackToHomepage} />;
  }

  if (showJordanComponent) {
    return <JordanComponent backToHomepage={handleBackToHomepage} />;
  }

  if (showAdidasComponent) {
    return <AdidasComponent backToHomepage={handleBackToHomepage} />;
  }

  if (showNewBalanceComponent) {
    return <NewBalanceComponent backToHomepage={handleBackToHomepage} />;
  }
  return (
    <div className="App">
      <nav id="nav">
        <div className="navTop">
          <header className="header1">
            <h1>Sole Haven</h1>
          </header>
        </div>
        <div className="navBottom">
          {brands.map((brand, index) => (
            <h3 key={index} className="menuItem" onClick={() => handleBrandClick(index)}>
              {brand}
            </h3>
          ))}
        </div>
      </nav>
      <div className="slider">
        <div className="sliderWrapper">
          <div className="sliderItem">
            {renderBrandImage()}
            <div className="sliderBg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;












