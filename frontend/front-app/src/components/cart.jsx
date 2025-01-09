import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:3001/api/v1';


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/cart/getcart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const result = response.data;
        const cart = result.cartItems[0].items;
        setCartItems(cart);
        calculateTotal(cart);
        fetchRecommendations(cart);
      })
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.quantity * item.service.Price, 0);
    setTotalAmount(total);
  };

  const fetchRecommendations = (cartItems) => {
    const serviceIds = cartItems.map(item => item.service.Id);
    axios
      .post(
        'http://localhost:5000/api/recommendations',
        { selected_service_id: serviceIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(response => {
        setRecommendations(response.data);
      })
      .catch(error => console.error('Error fetching recommendations:', error));
  };

  const handleRemoveItem = (itemId) => {
    axios
      .post(
        `${API_BASE_URL}/cart/removefromcart`, 
        {  itemId  },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        const updatedItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedItems);
        calculateTotal(updatedItems);
        fetchRecommendations(updatedItems);
      })
      .catch(error => console.error('Error removing item from cart:', error));
  };

  return (
    <div className="container mx-auto p-4 max-w-screen-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>

      {/* Cart Items List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map(item => (
          <div key={item.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="font-bold text-lg">{item.service ? item.service.Title : 'Service Title Unavailable'}</h2>
            <p className="text-gray-600">Price/sqft: Rs {item.service ? item.service.Price : 'N/A'}</p>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
            <p className="font-semibold">Total: Rs {item.service ? item.quantity * item.service.Price : 'N/A'}</p>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-8 p-4 border rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="font-bold text-lg text-center">Cart Summary</h2>
        <p className="text-gray-800 text-center">Total Amount: Rs {totalAmount}</p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
          <a href="/checkout">Proceed to Checkout</a>
        </button>
      </div>

      {/* Recommendations Section */}
      <div className="mt-8 p-4 border rounded-lg shadow-md">
        <h2 className="font-bold text-lg text-center">Recommended Services</h2>
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((recSet, idx) => (
              <div key={idx} className="p-4 border rounded-lg shadow-md">
                <h3 className="font-bold text-center">Recommendation Set {idx + 1}</h3>
                {recSet.map(rec => (
                  <div key={idx} className="mb-2">
                   
                    <span>Service : <p className='font-bold'>{rec.title}</p> {rec.title}</span>
                    <p>Category: {rec.category}</p>
                    <p>Price: Rs {rec.price}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
