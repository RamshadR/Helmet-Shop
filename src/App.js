import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Components/CSS/App.css";
import { PopularBrandsHelmets } from "./Components/ProductData/PopularBrands";
import { useState } from "react";
import { MyContext } from "./Context";
import { AllHelmets as AllHelmetsInitial } from "./Components/ProductData/data";
import { Users } from "./Components/User/Users";
import { Admins } from "./Components/User/Admins";

import Home from "./Components/Home";
import OffRoad from "./Components/Category/OffRoad";
import Signin from "./Components/LoginRegister/Signin";
import Wishlist from "./Components/Wishlist";
import Cart from "./Components/Cart";
import All from "./Components/All";
import Register from "./Components/LoginRegister/Register";
import AdminPanel from "./Components/AdminPanel";
import Logout from "./Components/LoginRegister/Logout";
import ManageUsers from "./Components/User/ManageUsers";
import ScrollToTop from "./Components/ScrollToTop";
import UserProfile from "./Components/User/UserProfile";
import AdminProfile from "./Components/User/AdminProfile";
import HalfFace from "./Components/Category/HalfFace";
import FullFace from "./Components/Category/FullFace";
import HelmetPage from "./Components/HelmetPage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(Users);
  const [admin, setAdmin] = useState(Admins);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const [allHelmets, setAllHelmets] = useState(AllHelmetsInitial);

  const [currentAccount, setCurrentAccount] = useState([]);

  const [likeProducts, setLikeProducts] = useState([]);
  const [addToCart, setAddToCart] = useState([]);

  const [popularBrandsHelmets, setPopularBrandsHelmets] =
    useState(PopularBrandsHelmets);

  const values = {
    popularBrandsHelmets,
    setPopularBrandsHelmets,
    allHelmets,
    setAllHelmets,
    likeProducts,
    setLikeProducts,
    addToCart,
    setAddToCart,
    searchQuery,
    setSearchQuery,
    user,
    setUser,
    admin,
    setAdmin,
    isAdmin,
    setIsAdmin,
    isUser,
    setIsUser,
    currentAccount,
    setCurrentAccount,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <ScrollToTop />
          <Routes>
            <Route
              path="/:category/:productId"
              element={<HelmetPage />}
            ></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/fullface" element={<FullFace />}></Route>
            <Route path="/offroad" element={<OffRoad />}></Route>
            <Route path="/all" element={<All />}></Route>
            <Route path="/halfface" element={<HalfFace />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/wishlist" element={<Wishlist />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/adminpanel" element={<AdminPanel />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/manageusers" element={<ManageUsers />}></Route>
            <Route path="/userprofile" element={<UserProfile />}></Route>
            <Route path="/adminprofile" element={<AdminProfile />}></Route>
          </Routes>
        </MyContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
