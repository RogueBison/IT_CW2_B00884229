import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes, useLocation } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import NavbarHome from "./components/navbarHome";
import DocumentList from "./components/DocumentList";
import Edit from "./components/edit";
import Create from "./components/create";
import Single from "./components/bookDetails";
import Home from "./components/home";

 const App = () => {
  const location = useLocation();
 return (
   <div>
      {location.pathname === '/' ? <NavbarHome /> : <Navbar />}

     {/* <Navbar /> */}
     <Routes>
       <Route exact path="/" element={<Home />} />
       <Route exact path="/admin" element={<DocumentList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/single/:id" element={<Single />} />
     </Routes>
   </div>
 );
};

export default App;

 