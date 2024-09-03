import React, { useState, useEffect } from 'react';
import './NikeComponent.css';
import View from './view';

function NikeComponent({ backToHomepage }) {
  const [nikeShoes, setNikeShoes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [sessionId, setSessionId] = useState(""); // Unique identifier for the user session
  const [addedToCart, setAddedToCart] = useState({}); // State to keep track of items added to cart

  useEffect(() => {
    fetchNikeShoes();
    // Generate a random session ID when the component mounts
    const sessionId = generateSessionId();
    setSessionId(sessionId);
  }, []);

  const fetchNikeShoes = async () => {
    try {
      const response = await fetch('http://localhost:8081/listNike');
      if (!response.ok) {
        throw new Error('Failed to fetch Nike shoes');
      }
      const data = await response.json();
      const initialSelectedSizes = {};
      data.forEach(shoe => {
        initialSelectedSizes[shoe.id] = '';
      });
      setSelectedSizes(initialSelectedSizes);
      setNikeShoes(data);
    } catch (error) {
      console.error('Error fetching Nike shoes:', error);
    }
  };

  const generateSessionId = () => {
    // Generate a random string for the session ID
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleSizeChange = (shoeId, size) => {
    setSelectedSizes(prevState => ({
      ...prevState,
      [shoeId]: size,
    }));
  };


  const handleAddToCart = async (shoeId) => {
    const size = selectedSizes[shoeId];
    try {
      setAddedToCart(prevState => ({
        ...prevState,
        [shoeId]: true,
      }));
  
      // Find the shoe corresponding to the given ID
      const shoe = nikeShoes.find(shoe => shoe.id === shoeId);
  
      // Convert the image data to a base64-encoded string
      const imageData = await fetch(shoe.image);
      const imageBlob = await imageData.blob();
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(imageBlob);
      });
  
      const response = await fetch('http://localhost:8081/cart/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId, // Send the session ID instead of userId
          id: shoe.id, // Send the id of the shoe
          quantity: 1, // Assuming you always add one shoe at a time
          size,
          price: shoe.price, // Send the price of the shoe
          name: shoe.name, // Send the name of the shoe
          image: base64Image, // Send the base64-encoded image data
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
      console.log(`Shoe ${shoeId} added to cart with size ${size}`);
  
      // Optionally, you can update the UI to indicate that the item was added to the cart
    } catch (error) {
      console.error('Error adding to cart:', error);
      // If there's an error, revert the addedToCart state
      setAddedToCart(prevState => ({
        ...prevState,
        [shoeId]: false,
      }));
    }
  
    // Set a timeout to hide the "Added to Cart" message after 2 seconds
    setTimeout(() => {
      setAddedToCart(prevState => ({
        ...prevState,
        [shoeId]: false,
      }));
    }, 4000);
  };
  
  
  const goToCartView = () => {
    setShowCart(true);
  };

  const handleBackToHomepage = () => {
    setShowCart(false);
  };

  if (showCart) {
    return <View backToHomepage={handleBackToHomepage} />;
  }

  return (
    <div className="nike-container">
      <button className="back-button" onClick={backToHomepage}>Back to Homepage</button>
      <button className="cart-button" onClick={goToCartView}>Go to Cart</button>
      <h1 className="Title">Nike Selection</h1>
      <div className="shoe-list">
        {nikeShoes.map(shoe => (
          <div key={shoe.id} className="shoe-item">
            <p className="price">${shoe.price}</p>
            <img src={shoe.image} alt={shoe.name} />
            <h2>{shoe.name}</h2>
            <p>{shoe.description}</p>
            <select value={selectedSizes[shoe.id]} onChange={(e) => handleSizeChange(shoe.id, e.target.value)}>
              <option value="">Select Size</option>
              {[...Array(8).keys()].map(size => (
                <option key={size + 6} value={size + 6}>{size + 6}</option>
              ))}
            </select>
            {addedToCart[shoe.id] && <p className="added-to-cart">Added to Cart</p>}
            {!addedToCart[shoe.id] && <button onClick={() => handleAddToCart(shoe.id)}>Add to Cart</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NikeComponent;

