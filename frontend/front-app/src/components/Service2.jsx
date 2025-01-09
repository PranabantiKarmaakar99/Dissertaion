import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = 'http://localhost:3001/api/v1';

const roomOptions = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Dining Room", "Office"];

const ServiceList = () => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/service/allservice`)
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((service) => service.Category === selectedCategory);

  if (loading) {
    return <p>Loading services...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Our Services</h1>

      {/* Select Room */}
      {/* <div className="mb-4">
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
      </div> */}

      {/* Service Categories
      <div className="flex space-x-4 mb-6">
        {["All", ...new Set(services.map((service) => service.Category))].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div> */}

      {/* Service Categories */}
<div className="mb-4">
  <label className="block text-lg font-semibold mb-2">Select Service Category:</label>
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="w-full p-2 border rounded"
  >
    <option value="All">All Categories</option>
    {[...new Set(services.map((service) => service.Category))].map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
</div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service.Id} service={service} navigate={navigate} />
        ))}
      </div>
    </div>
  );
};

const ServiceCard = ({ service, navigate }) => {
  const [quantity, setQuantity] = useState("");

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    if (!quantity || quantity <= 0 || isNaN(quantity)) {
      alert("Please enter a valid quantity.");
      return;
    }

    const payload = {
      serviceId: service.Id,
      quantity: Number(quantity),
    };

    axios
      .post(`${API_BASE_URL}/cart/addtocart`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert("Item added to cart!");
        navigate("/cart");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("Failed to add item to cart.");
      });
  };

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg">
      <h2 className="text-lg font-bold mb-2">{service.Title}</h2>
      <p className="text-gray-600 text-sm text-gray-800 mb-2">Specification: {service.Specification}</p>
      <p className="text-gray-600 mb-2">Category: {service.Category}</p>
      <p className="text-gray-800 font-semibold">Price/sqft: Rs {service.Price}</p>
      <div className="flex flex-col mt-4">
        <label className="font-semibold">Area</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="text-gray-800 border p-2 rounded mt-1"
        />
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ServiceList;
