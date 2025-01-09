import Service from "../src/components/Service2";
import Cart from "../src/components/cart";
import Navbar from "./components/navbar2";
import SignIn from "./components/Signin";
import SignOut from "./components/Signout";
import SignUp from "./components/SignUp";
import CheckOut from './components/checkout';
import LandingPage from './components/landing_page2';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import  ServiceSelection  from "./components/serviceselector";

function App() {


  return (
    <>
   
        <BrowserRouter>
        <Navbar />
                <Routes>
                    <Route
                        exact
                        path="/service"
                        element={<Service />}
                    />
                   
                    <Route
                        exact
                        path="/"
                        element={<LandingPage />}
                    />
                    <Route
                        exact
                        path="/cart"
                        element={<Cart />}
                    />
                    <Route
                        exact
                        path="/signin"
                        element={<SignIn />}
                    />
                     <Route
                        exact
                        path="/signout"
                        element={<SignOut />}
                    />
                     <Route
                        exact
                        path="/signup"
                        element={<SignUp />}
                    />
                      <Route
                        exact
                        path="/serviceselection"
                        element={<ServiceSelection />}
                    />
                     <Route
                        exact
                        path="/checkout"
                        element={<CheckOut />}
                    />
                </Routes>
            </BrowserRouter>
    </>
  )
}

export default App
