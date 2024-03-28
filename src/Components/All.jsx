import Navbar from "./Navbar";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { MyContext } from "../Context";
import "./CSS/All.css";
import Footer from "./Footer";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LikeBtn from "./LikeBtn";
import AddToCartBtn from "./AddToCartBtn";

const All = () => {
  const { allHelmets, setSearchQuery } = useContext(MyContext);

  const [filteredProducts, setFilteredProducts] = useState(allHelmets);

  const [selectedBrand, setSelectedBrand] = useState("");
  const location = useLocation();

  const nav = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = allHelmets.filter((product) => {
      const { title, company, category } = product;
      return (
        (selectedBrand === "" || company.toLowerCase() === selectedBrand) &&
        (title.toLowerCase().includes(query.toLowerCase()) ||
          company.toLowerCase().includes(query.toLowerCase()) ||
          category.toLowerCase().includes(query.toLowerCase()))
      );
    });
    setFilteredProducts(filteredResults);
  };

  const handleBrands = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setFilteredProducts(
      allHelmets.filter((helmet) => helmet.company.toLowerCase() === brand)
    );
  };

  const distinctBrands = [
    ...new Set(allHelmets.map((item) => item.company.toLowerCase())),
  ];

  const [sortOption, setSortOption] = useState("");

  const handleSort = (option) => {
    setSortOption(option);
    let sortedProducts = [...filteredProducts];

    switch (option) {
      case "name":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "lowToHigh":
        sortedProducts.sort((a, b) => a.newPrice - b.newPrice);
        break;
      case "highToLow":
        sortedProducts.sort((a, b) => b.newPrice - a.newPrice);
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const brandParam = params.get("brand");
    if (brandParam) {
      setFilteredProducts(
        allHelmets.filter(
          (helmet) => helmet.company.toLowerCase() === brandParam
        )
      );
    } else {
      setFilteredProducts(allHelmets);
    }
  }, [allHelmets, location.search]);

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="filter-section">
        <div className="recommended">
          <h2>Recommended</h2>
          <br />

          <button onClick={() => setFilteredProducts(allHelmets)}>
            All Products
          </button>

          {distinctBrands.map((brand, i) => (
            <button value={brand} key={i} onClick={handleBrands}>
              {brand}
            </button>
          ))}
        </div>

        <div className="sortby">
          <label htmlFor="sortDropdown">Sort by:</label>
          <select
            id="sortDropdown"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Select</option>
            <option value="name">Name</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="container">
        {filteredProducts.map((helmet, index) => (
          <li key={index}>
            <div className="wrapper">
            <Link to={`/all/${helmet.id}`} style={{ textDecoration: "none", color: "black" }}>
              <div className="wrapper-img">
                <img src={helmet.img} alt="img" />
              </div>
              <div className="text">
                <p>{helmet.title}</p>
                <p>{helmet.company}</p>
                <p>{helmet.category}</p>
                <p>{helmet.newPrice}</p>
              </div>
              </Link>
              <div className="btns">
                <LikeBtn helmet={helmet} />
                <AddToCartBtn helmet={helmet} />
              </div>
            </div>
          </li>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default All;
