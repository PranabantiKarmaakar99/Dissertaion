import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import { CiHome } from "react-icons/ci";

import abc from '../public/image/2.jpg';
import b from '../public/image/4.jpg';
import c from '../public/image/5.jpg';
import d from '../public/image/6.jpg';
import e from '../public/image/7.jpg';
import f from '../public/image/7.jpg';
import g from '../public/image/6.jpg';
import { IoIosArrowRoundUp } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import "./LandingPage.css"; // Add custom styles if needed

const products = [
    { id: 1, title: "Furniture", image: c },
    { id: 2, title: "Decor", image: c },
    { id: 3, title: "Lighting", image: c },
    { id: 4, title: "Outdoor", image: c },
    { id: 5, title: "Bedding", image: c },
    { id: 6, title: "Kitchen", image: c },
  ];

  const roomData = [
    { id: 1, title: "Kitchen", image: c },
    { id: 2, title: "Living", image: e },
    { id: 3, title: "Bedroom", image: abc },
    { id: 4, title: "Study", image: d },
    { id: 5, title: "WashRoom", image: d },
    { id: 6, title: "Other", image: e },
  ];

  const testimonialData = [
    {
      id: 1,
      title: "Case Study: Modern Kitchen",
      description: "The transformation was amazing!",
      client: "Client Name",
      image: d,
    },
    {
      id: 2,
      title: "Case Study: Modern Living Room",
      description: "Loved the new look of my space!",
      client: "Another Client",
      image: d,
    },
    {
      id: 3,
      title: "Case Study: Modern Bedroom",
      description: "A cozy and modern vibe, just what I wanted!",
      client: "Yet Another Client",
      image: d,
    },
  ];
  

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const servicesRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  useEffect(() => {
    // Hero Section Animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );

    // Heading Animation
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      }
    );

    // Services Animation with ScrollTrigger
    gsap.fromTo(
      servicesRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      {/* <section className="hero bg-cover bg-grey-200 bg-center relative" ref={heroRef}>
        <div className="hero-content text-center text-black py-24 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Transform Your Space
          </h1>
          <p className="text-xl mt-4">
            Innovative interior design and turnkey solutions tailored for you.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-black font-bold rounded-lg">
            Get Started
          </button>
        </div>
      </section> */}
      <section className ="landingpage h-screen w-full flex flex-col bg-stone-100" ref={heroRef}>
      <nav className='flex justify-between my-4 mx-4 h-14 logo'>
        <a className='flex gap-1 '><CiHome className='text-3xl ' />
        <h1 className='text-2xl font-semibold'>The Abode</h1>
        </a>
      
        <div className=' flex gap-8 justify-start text-sm navbar '>
        <Link to ="/dashboard"> <a >About</a> </Link>
        <Link to ="/service"> <a>Shop</a> </Link>
        <Link to ="/projects"> <a>Projects</a> </Link>
        <Link to ="/about"> <a>Products</a> </Link>
       
        
          
        <Link href="/"> <button className='Estimate px-4 py-1 bg-black text-stone-200 rounded-lg'>Estimate</button> </Link>
          <button className='Signup px-4 py-1 border border-black text-black rounded-lg'> SignUp</button>
         
        </div>
      </nav>
      
      <div className=" center flex  w-full h-3/4   ">
        <div className='lefthalf flex  flex-col gap-4 w-1/2 '>
        <div className='part1 text-9xl  m-12'>
        Transform Your Space
      </div>
      <div className='buttons flex gap-2 mx-12'>
      <button className='Estimate px-4 py-2 flex bg-black text-stone-200 rounded-lg text-lg text-center '>Get an instant Estimate <IoIosArrowRoundUp className='rotate-45 text-4xl py-1'/></button>
          <button className='Signup px-4 py-2 flex border border-black text-black rounded-lg text-lg text-center'>Explore Design Packages <IoIosArrowRoundUp className='rotate-45 text-4xl py-1'/></button>
      </div>
      <div className='part2 text-lg  mx-12'>
      Create the home of your dreams with our tailored product and service packages, designed to fit your style and budget.
      </div>
      <div className='images flex gap-2 justify-start align-start  mx-12 h-40 overflow-hidden h-2/5 '>
        <img src={b} alt='image1' width={200} height={100} className='img object-cover' />
        <img src={c} alt='image1' width={200} height={100} className='img object-cover' />
        <img src={d} alt='image1' width={200} height={100} className='img object-cover' />
      </div>
      
      
     
        </div>
      
      <div className='righthalf w-1/2 flex items-center justify-center h-full bg-stone-200 '>
        <div className=' backGrnd h-3/4 items-center justify-center  flex overflow-hidden  w-3/4'>
        <img src={abc} alt='image' width={400} height={400} className='object-cover' /> 

        </div>
       
      
        
      </div>
      
     



      </div>
     

      <div className='marquee  w-full h-full'>
        <div className='marquee-content mt-16 font-dancing text-2xl text-stone-500 overflow-hidden flex gap-32 justify-center items-center h-fit text-nowrap'>
        {/* <span>Tata Avenida | Sanjeeva Town | Merlin One | NBCC | Rishi Ecoview | Sanjeeva Gardens | Swarn Court | GreenTown</span> */}
        <a className='px-10'> Sanjeeva Town</a>
        <a className='px-10'> Merlin One</a>
        <a className='px-10'>NBCC</a>
        <a className='px-10'>Rishi Ecoview</a>
        <a className='px-10'>Sanjeeva Gardens</a>
        <a className='px-10'>Swarn Court</a>
        <a className='px-10'>GreenTown</a> 
        <a className='px-10'> Sanjeeva Town</a>
        <a className='px-10'> Merlin One</a>
        <a className='px-10'>NBCC</a>
        <a className='px-10'>Rishi Ecoview</a>
        <a className='px-10'>Sanjeeva Gardens</a>
        <a className='px-10'>Swarn Court</a>
        <a className='px-10'>GreenTown</a>
        <a className='px-10'> Sanjeeva Town</a>
        <a className='px-10'> Merlin One</a>
        <a className='px-10'>NBCC</a>
        <a className='px-10'>Rishi Ecoview</a>
        <a className='px-10'>Sanjeeva Gardens</a>
        <a className='px-10'>Swarn Court</a>
        <a className='px-10'>GreenTown</a>
        </div>
      </div>

    </section>


      {/* About Section */}
      <section className="about py-16 px-4 text-center">
        <div ref={headingRef}>
          <h2 className="text-3xl font-bold">About Us</h2>
          <p className="mt-4 text-lg">
            We are a leading interior design and construction company, blending
            style with functionality to bring your vision to life.
          </p>
        </div>
      </section>



     //DesignbyRoomSection
      <section className="section2 h-screen w-full bg-stone-100 flex items-center justify-center">
  <div className="part1 w-full text-center p-8">
    <h2 className="text-4xl font-semibold">Design by Room</h2>
    <p className="text-sm mt-4">Select customized products and services by Rooms</p>

    <div className="cards w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-10 mt-4 px-4">
      {roomData.map((room) => (
        <div
          key={room.id}
          className="rounded-lg shadow-lg mx-8 h-72 flex relative overflow-hidden"
        >
          <img src={room.image} alt={room.title} className="object-cover h-full w-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-50">
          
              <h2 className="text-black text-xl font-semibold">{room.title}</h2>
              <button className="bg-black rounded-lg py-1 px-2 text-white shadow-lg mt-2">
                Start Here
              </button>
            </div>
          </div>
       
      ))}
    </div>
  </div>
</section>;

//productSection
      <section className="section4 product-catalog h-screen w-full bg-stone-100 flex items-center justify-center">
  <div className="part1 w-full text-center p-8">
    <h2 className="text-4xl font-semibold">Explore Our Product Line</h2>
    <p className="text-sm mt-4">Select from a wide range of products categorized for your convenience.</p>
    
   {/* Filter Options */}
<div className="filters flex gap-4 justify-center mt-4">
  <select className="filter-dropdown bg-black text-white px-4 py-2 rounded-lg" name="style" id="style">
    <option value="" disabled selected>Select Style</option>
    <option value="modern">Modern</option>
    <option value="classic">Classic</option>
    <option value="rustic">Rustic</option>
  </select>

  <select className="filter-dropdown bg-black text-white px-4 py-2 rounded-lg" name="price" id="price">
    <option value="" disabled selected>Select Price Range</option>
    <option value="low-high">Price: Low to High</option>
    <option value="high-low">Price: High to Low</option>
  </select>
</div>
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 px-4">
 
    {products.map((product) => (
      <div
        key={product.id}
        className="rounded-lg shadow-lg h-64 w-full flex border border-black relative overflow-hidden"
      >
        <img src={product.image} alt={product.title} className="object-cover h-full w-full" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <h2 className="text-white text-xl font-semibold">{product.title}</h2>
          <button className="bg-black rounded-lg py-1 px-2 text-white shadow-lg mt-2">Shop Now</button>
        </div>
      </div>
    ))}
  </div>
  </div>
</section>;

      {/* Services Section */}
      <section className="services py-16 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          ref={servicesRef}
        >
          <div className="service-card bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold">Interior Design</h3>
            <p className="mt-2">
              Crafting bespoke designs that reflect your personality and needs.
            </p>
          </div>
          <div className="service-card bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold">Turnkey Solutions</h3>
            <p className="mt-2">
              Comprehensive services from concept to completion.
            </p>
          </div>
          <div className="service-card bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold">Consultation</h3>
            <p className="mt-2">
              Expert advice to help you make informed decisions.
            </p>
          </div>
        </div>
      </section>
     
  {/* Testimonial *
 <section className="testimonials h-screen w-full bg-stone-200 flex items-center justify-center">
  <div className="w-full text-center p-8">
    <h2 className="text-4xl font-semibold">Transformations We’ve Done</h2>
    <p className="text-sm mt-4">
      Check out our successful projects and read what our clients have to say.
    </p>

    <div >
    <Slider {...settings}>
  {testimonialData.map((testimonial, index) => (
    <div key={index} className="slide-container">
      <img src={testimonial.image} alt={testimonial.title} className="object-cover h-full w-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <h2 className="text-white text-xl font-semibold">{testimonial.title}</h2>
        <p className="text-white text-sm mt-2">"{testimonial.description}" - {testimonial.client}</p>
        <button className="bg-black rounded-lg py-1 px-2 text-white shadow-lg mt-2">Get Inspired</button>
      </div>
    </div>
  ))}
</Slider>
    </div>
  </div>
</section>; */}
<section className="how-it-works h-screen w-full bg-stone-200 flex items-center justify-center">
  <div className="w-full text-center p-8">
    <h2 className="text-4xl font-semibold">How Our Design Process Works</h2>
    <p className="text-sm mt-4">We make the process simple and seamless for you.</p>

    {/* Define Steps Data */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16 px-4 ">
      {[
        {
          image: b,
          title: "1. Book a Consultation",
          description: "Get started with a free consultation.",
        },
        {
          image: b,
          title: "2. Discuss Your Vision",
          description: "We'll listen to your ideas and create a plan.",
        },
        {
          image: b,
          title: "3. Receive a Custom Design",
          description: "Get a personalized design for your space.",
        },
        {
          image: b,
          title: "4. Implement the Design",
          description: "We’ll bring your dream space to life.",
        },
      ].map((step, index) => (
        <div key={index} className="step text-center">
          <img src={step.image} alt={step.title} className="h-48 w-48 mx-auto mb-2 object-cover" />
          <h3 className="text-xl font-semibold">{step.title}</h3>
          <p className="text-sm">{step.description}</p>
        </div>
      ))}
    </div>

    <button className="bg-black text-white px-4 py-2 rounded-lg mt-12">Start with an Initial Estimate</button>
  </div>
</section>



<section className="estimation-tool h-screen w-full bg-stone-100 flex items-center justify-center">
  <div className="text-center p-8 w-full max-w-lg">
    <h2 className="text-4xl font-semibold">Estimate Your Project</h2>
    <p className="text-sm mt-4">Input your project details and get an instant estimate.</p>

    {/* Estimation Form Example */}
    <form className="w-full grid grid-cols-1 gap-4 mt-8">
      <input 
        type="text" 
        placeholder="Room Size" 
        className="p-2 border border-black rounded-lg" 
      />
      <input 
        type="text" 
        placeholder="Style Preferences" 
        className="p-2 border border-black rounded-lg" 
      />
      <input 
        type="number" 
        placeholder="Budget" 
        className="p-2 border border-black rounded-lg" 
      />
    </form>

    <button className="bg-black text-white px-4 py-2 rounded-lg mt-4">See Your Estimate</button>
  </div>
</section>
<footer className="bg-black text-white py-4">
  <div className="container mx-auto text-center">
    <p>&copy; 2024 The Abode. All Rights Reserved.</p>
    <div className="flex justify-center mt-2 space-x-4">
      <a href="/about" className="hover:underline">About</a>
      <a href="/shop" className="hover:underline">Shop</a>
      <a href="/contact" className="hover:underline">Contact</a>
    </div>
  </div>
</footer>

    </div>
  );
};

export default LandingPage;
