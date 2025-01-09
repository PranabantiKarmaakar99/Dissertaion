import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router';


const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

 const navigate = useNavigate();

  useEffect(() => {
    // Fetch services from backend
    axios.get('http://localhost:3001/api/v1/service/allservice')
      .then(response => {
        const servicesData = response.data;
        setServices(servicesData);

        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(servicesData.map(service => service.Category))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching services:', error));
  }, []);





  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(service => service.Category === selectedCategory);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Our Services</h1>

      {/* Category Filter */}
      <div className="flex space-x-4 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <ServiceCard key={service.Id} service={service} />
        ))}
      </div>
    </div>
  );
};

const ServiceCard = ({ service }) => {

    const [quantity,setQuantity] = useState(0)

    const onClickHandler =() => {

        const token = localStorage.getItem('token');
        
        const payload = {
            serviceId: service.Id, // Sending service ID
            quantity: Number(quantity),}

            console.log("payload:",payload)

        axios.post('http://localhost:3001/api/v1/cart/addtocart',payload, { headers: {
            Authorization: `Bearer ${token}`,  // Add Bearer token here
          }}).then(response=>{
            const cartitem = response.data;
           console.log('cartitem:',cartitem);
          navigate('/cart')
        }).catch(error=>{
            console.error('Error fetching or adding to cart:', error);
        })
    
      }
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg">
      <h2 className="text-lg font-bold mb-2">{service.Title}</h2>
      <p className="text-gray-600 mb-2">Category: {service.Category}</p>
      <p className="text-gray-800 font-semibold">Price/sqft: Rs{service.Price}</p>
      <div className='flex flex-col'>
        <label>Quantity</label>
      <input onChange= {(e)=>{console.log(e.target.value); setQuantity(e.target.value)}} type='text' className="text-gray-800 border border-gray-800 w-1/2 font-semibold"/> 
      </div>
      
      <button onClick={onClickHandler} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
};

export default ServiceList;

