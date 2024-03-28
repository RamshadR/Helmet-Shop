import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../Context";
import "./CSS/AddToCart.css";
import { useLocation } from "react-router-dom";

const AddToCartBtn = ({ helmet }) => {
  const { pathname } = useLocation();

  const { addToCart, setAddToCart, isAdmin, isUser } = useContext(MyContext);

  const nav = useNavigate();

  const handleCart = (product) => {
    if (isAdmin || isUser) {
      if (addToCart.includes(product)) {
        setAddToCart(addToCart.filter((helmet)=>helmet !== product))
      } else {
        setAddToCart([...addToCart, product]);
      }
    } else {
      alert("Your are not logged in! Please Login to continue");
      nav("/signin");
    }
  };

  const handleRemove = (product) => {
    setAddToCart(addToCart.filter((helmet) => helmet !== product));
  };

  return (
    <div className="addToCart">
      {pathname !== "/cart" ? (
        <button onClick={() => handleCart(helmet)}>
          {addToCart.includes(helmet) ? (
            <span> Remove Cart</span>
          ) : (
            <span>Add to Cart</span>
          )}
        </button>
      ) : (
        <div className="remove">
          <button onClick={() => handleRemove(helmet)}>Remove</button>
        </div>
      )}
      
    </div>
  );
};

export default AddToCartBtn;