import { Link } from "react-router-dom";
import "./CSS/Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../Context";
import React, { useState } from "react";

const Navbar = ({ onSearch }) => {
  const nav = useNavigate();

  const { isAdmin, isUser } = useContext(MyContext);

  const { pathname } = useLocation();

  const handleInputChange = (e) => {
    const query = e.target.value;
    onSearch(query);
  };

  const shouldRenderSearchInput =
    pathname !== "/register" &&
    pathname !== "/signin" &&
    pathname !== "/" &&
    pathname !== "/userprofile";

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="navbar">
        <div className="links">
          <Link to="/">HOME</Link>
          <Link to="/all">All</Link>
          <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              Helmet Categories
              <span className={`arrow ${isOpen ? "open" : ""}`}>&#9660;</span>
            </button>
            {isOpen && (
              <div className="dropdown-menu">
                <Link to="/fullface">FullFace</Link>
                <Link to="/offroad">OffRoad</Link>
                <Link to="/halfface">HalfFace</Link>
              </div>
            )}
          </div>
          {isAdmin && pathname === "/" && (
            <Link to="/adminpanel">Admin Panel</Link>
          )}
        </div>
        <div className="logo" onClick={() => nav("/")}>
          RTRONE
        </div>
        <div className="nav-end">
          {shouldRenderSearchInput && (
            <div className="search">
              <input
                type="text"
                className="searchbox"
                placeholder="Search for a Helmet..."
                onChange={handleInputChange}
              />
              <img src="/search.png" alt="" />
            </div>
          )}
          {!isUser && !isAdmin && (
            <div className="signin">
              <Link to="/signin">
                <img src="/user.png" alt="" />
              </Link>
            </div>
          )}
          <div className="wishlist">
            <Link to="/wishlist">
              <img src="/wishlist.png" alt="" />
            </Link>
          </div>
          <div className="cart">
            <Link to="/cart">
              <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="" />
            </Link>
          </div>
          {
            <div className="logout">
              {isUser && (
                <>
                  <div>
                    <Link to="/userprofile">
                      <img className="signin" src="https://icon-library.com/images/icon-login/icon-login-4.jpg" alt="" />
                    </Link>
                  </div>
                  <Link to="/logout">
                    <img  className="loginaccount" src="/logout.png" alt="" />
                  </Link>
                
                </>
              )}
              {isAdmin && (
                <>
                  <div className="loginaccount">
                    <Link to="/adminprofile">
                    <img  className="adminpropic" src="https://yt3.ggpht.com/ytc/AIf8zZQC9SRwa6GCA8Tt2T3rcV9GUsDeuZnwX2b7nHes=s48-c-k-c0x00ffffff-no-rj" alt="" />
                    </Link>
                  </div>
                  <Link to="/logout">
                    <img src="/logout.png" alt="" />
                  </Link>
                </>
              )}
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Navbar;
