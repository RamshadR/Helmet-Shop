import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Navbar";
import { MyContext } from "../../Context";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LikeBtn from "../LikeBtn";
import AddToCartBtn from "../AddToCartBtn";

const FullFace = () => {
  const { allHelmets, setSearchQuery } = useContext(MyContext);

  const filteredFullFaceProduct = allHelmets.filter(
    (product) => product.category.toLowerCase() === "fullface"
  );

  const [filteredFullFaceProducts, setFilteredFullFaceProducts] = useState(
    filteredFullFaceProduct
  );
  const [
    originalFilteredFullFaceProducts,
    setOriginalFilteredFullFaceProducts,
  ] = useState(filteredFullFaceProduct);

  useEffect(() => {
    setFilteredFullFaceProducts(originalFilteredFullFaceProducts);
  }, [originalFilteredFullFaceProducts]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredFullFaceResults = originalFilteredFullFaceProducts.filter(
      (product) => {
        const { title, company, category } = product;
        return (
          title.toLowerCase().includes(query.toLowerCase()) ||
          company.toLowerCase().includes(query.toLowerCase()) ||
          category.toLowerCase().includes(query.toLowerCase())
        );
      }
    );
    setFilteredFullFaceProducts(filteredFullFaceResults);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div className="container">
        {filteredFullFaceProducts.map((helmet, index) => (
          <li key={index}>
            <div className="wrapper">
              <Link
                to={`/fullface/${helmet.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
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

export default FullFace;
