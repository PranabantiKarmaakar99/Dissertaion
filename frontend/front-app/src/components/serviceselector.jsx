import React, { useState } from "react";

const roomOptions = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Dining Room", "Office"];
const serviceCategories = ["Painting", "Lighting", "Furniture", "Electrical", "Plumbing", "Cleaning"];

// Example service items (mock data)
const serviceItems = {
  Painting: [
    { id: 1, title: "Wall Painting", price: 2000 },
    { id: 2, title: "Ceiling Painting", price: 1500 },
  ],
  Lighting: [
    { id: 3, title: "Chandelier Installation", price: 5000 },
    { id: 4, title: "LED Light Setup", price: 3000 },
  ],
  Furniture: [
    { id: 5, title: "Bed Assembly", price: 3000 },
    { id: 6, title: "Table Setup", price: 2000 },
  ],
};

const AddToCartInterface = () => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const handleAddToCart = () => {
    if (!selectedRoom || !selectedCategory || !selectedItem) {
      alert("Please select a room, category, and item before adding to the cart.");
      return;
    }

    const newCartItem = {
      roomName: selectedRoom,
      category: selectedCategory,
      item: {
        serviceId: selectedItem.id,
        title: selectedItem.title,
        price: selectedItem.price,
        quantity,
      },
    };

    setCart([...cart, newCartItem]);
    alert("Item added to cart!");
    // Reset selections
    setSelectedCategory("");
    setSelectedItem(null);
    setQuantity(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Items to Cart</h1>

      {/* Select Room */}
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Select Room:</label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Room --</option>
          {roomOptions.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>

      {/* Select Service Category */}
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Select Service Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Category --</option>
          {serviceCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Select Item */}
      {selectedCategory && (
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Select Item:</label>
          <select
            value={selectedItem ? selectedItem.id : ""}
            onChange={(e) =>
              setSelectedItem(serviceItems[selectedCategory].find((item) => item.id === parseInt(e.target.value)))
            }
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select Item --</option>
            {serviceItems[selectedCategory].map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} - Rs {item.price}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Quantity Input */}
      {selectedItem && (
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>

      {/* Display Cart */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((cartItem, index) => (
              <div key={index} className="border p-4 rounded shadow-md">
                <h3 className="font-bold">{cartItem.roomName}</h3>
                <p>Category: {cartItem.category}</p>
                <p>
                  Item: {cartItem.item.title} - Rs {cartItem.item.price} x {cartItem.item.quantity}
                </p>
                <p>Total: Rs {cartItem.item.price * cartItem.item.quantity}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCartInterface;

  