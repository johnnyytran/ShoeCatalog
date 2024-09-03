import React, { useState, useEffect } from 'react';

function CartView({ backToHomepage }) {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8081/cart/getallcartitems');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setShoes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (shoeId) => {
    try {
      const response = await fetch(`http://localhost:8081/cart/getcarted/${shoeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log("Item deleted successfully");
        setShoes(prevShoes => prevShoes.filter(shoe => shoe.id !== shoeId));
      } else {
        console.error("Failed to delete item from cart");
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  }

  return (
    <div className="cart-view-container" style={{ backgroundImage: "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTU4NDgwMy1pbWFnZS1rd3Z4dmxjai5qcGc.jpg')", backgroundSize: "cover", backgroundPosition: "center", padding: "20px", minHeight: "100vh", backgroundColor: "white" }}>
      <h1>Cart</h1>
      <button onClick={backToHomepage}>Back</button>
      {loading ? <p>Loading...</p> :
      <div className="shoe-list-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px'}}>
        {shoes.map((shoe) => (
          <div className="shoe-box-container" style={{ backgroundColor: 'white'}} key={shoe.id}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', maxWidth: '400px', height: '150px', backgroundColor: 'transparent' }}>
              <img src={shoe.image} alt={shoe.name} style={{ width: 'auto', height: '100%', objectFit: 'cover', marginRight: '10px' }} />
              <div className="shoe-info-container" style={{ padding: '10px', textAlign: 'left', borderRadius: '5px' }}>
                <h2 style={{ fontSize: '75%' }}>{shoe.name}</h2>
                <p style={{ fontSize: '75%' }}>Size: {shoe.size}</p>
                <p style={{ fontSize: '75%' }}>Price: ${shoe.price}</p>
                <p style={{ fontSize: '75%' }}>Quantity: {shoe.quantity}</p>
                <button onClick={() => handleDelete(shoe.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      }
    </div>
  );
}

export default CartView;
