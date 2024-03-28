import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MyContext } from "../Context";
import Navbar from "./Navbar";
import "./CSS/ShoppingBag.css";
import { Link } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";
import Footer from "./Footer";

const Cart = () => {
  const { addToCart, setAddToCart, setSearchQuery } = useContext(MyContext);

  const [originalCartProducts, setOriginalCartProducts] = useState(addToCart);

  useEffect(() => {
    setAddToCart(originalCartProducts);
  }, [originalCartProducts]);

  const handleQuantityChange = (helmet, newQuantity) => {
    const updatedCart = addToCart.map((item) => {
      if (item === helmet) {
        item.quantity = newQuantity;
      }
      return item;
    });

    setAddToCart(updatedCart);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredCartResults = originalCartProducts.filter((product) => {
      const { title, company, category } = product;
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        company.toLowerCase().includes(query.toLowerCase()) ||
        category.toLowerCase().includes(query.toLowerCase())
      );
    });
    setAddToCart(filteredCartResults);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div className="shoppingbag">
        <div className="container2">
          {addToCart.length === 0 ? (
            <p
              style={{
                width: "100%",
                height: "70vh",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              Your Cart bag is empty
            </p>
          ) : (
            addToCart.map((helmet, index) => (
              <li key={index} style={{ listStyle: "none" }}>
                <div className="wrapper2">
                  <Link
                    to={`/cart/${helmet.id}`}
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
                  <div className="quantity">
                    <h4>Quantity :</h4>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          helmet,
                          Math.max((helmet.quantity || 1) - 1, 1)
                        )
                      }
                    >
                      -
                    </button>
                    <span>{helmet.quantity || 1}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(helmet, (helmet.quantity || 1) + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="removBtn">
                    <AddToCartBtn helmet={helmet} />
                  </div>
                </div>
              </li>
            ))
          )}
        </div>

        {addToCart.length !== 0 && (
          <div className="sidebar">
            <div className="cartinfo">
              <div className="ordersumm">
                <h2>Order Summary</h2>
              </div>
              <div className="cartitems">
                <ol>
                  <table>
                    {addToCart.map((helmet) => (
                      <tbody key={helmet.title}>
                        <tr>
                          <td>
                            <li>{helmet.title}</li>
                          </td>
                          <td>
                            <div>Quantity {helmet.quantity || 1}</div>
                          </td>
                          <td>
                            <div>
                              Price {helmet.newPrice * (helmet.quantity || 1)}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </ol>
              </div>
              <div className="totalprice">
                <h1>
                  Total: ₹
                  {addToCart.reduce(
                    (prev, current) =>
                      prev + current.newPrice * (current.quantity || 1),
                    0
                  )}
                </h1>
                <button>CheckOut</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
