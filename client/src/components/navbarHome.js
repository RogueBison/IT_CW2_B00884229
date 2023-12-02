import React from "react";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 // We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 // Here, we display our Navbar
export default function NavbarHome() {
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
             <NavLink className="nav-link" to="/admin">
               ADMIN
             </NavLink>
           </li>
          </ul>
          <ul className="navbar-nav ms-auto">
           <li className="nav-item">
             <NavLink className="nav-link" to="/">
               DISCOUNTS
             </NavLink>
           </li>
           <li className="nav-item">
             <NavLink className="nav-link" to="/">
              HIGHEST RATED
             </NavLink>
           </li>
           <li className="nav-item">
             <NavLink className="nav-link" to="/">
              NEW
             </NavLink>
           </li>
         </ul>
       </div>
     </nav>
   </div>
 );
}