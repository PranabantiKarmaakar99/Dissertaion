import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";




const Navbar = () => {
    const token = localStorage.getItem("token"); // Check if user is authenticated
     const heroRef = useRef(null);

     useEffect(() => {
        // Hero Section Animation
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
        )},[])

    return (
<nav className='flex justify-between my-6 mx-4 h-12 logo' ref={heroRef}>
        <a className='flex gap-1 ' href='/'><CiHome className='text-3xl ' />
        <h1 className='text-2xl font-semibold'>The Abode</h1>
        </a>
      
        <div className=' flex gap-8 justify-start text-sm navbar '>
        {/* <Link to ="/signup"> <a >SignUp</a> </Link> */}
        {/* <Link to ="/signin"> <a >SignIn</a> </Link> */}
        {/* <Link to ="/service"> <a>Service</a> </Link> */}
        <Link to ="/cart"> <a>Cart</a> </Link>
        {!token? (
                    <>
                      <Link
                        to="/signup"
                       
                      >
                        Sign Up
                      </Link>
                      <Link
                        to="/signin"
                       
                      >
                        Sign In
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/signout"
                    //   className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                    >
                      Sign Out
                    </Link>
                  )}
       
       
        
          
        <Link to="/service"> <button className='Estimate px-4 py-1 bg-black text-stone-200 rounded-lg'>Estimate</button> </Link>
        {/* <Link to="/signup"><button className='Signup px-4 py-1 border border-black text-black rounded-lg'> SignUp</button></Link> */}
         
        </div>
      </nav>)

};

export default Navbar;