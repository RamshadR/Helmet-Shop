import { useContext } from "react";
import { MyContext } from "../Context";
import { useNavigate } from "react-router-dom";
import "./CSS/LikeBtn.css";
import { useLocation } from "react-router-dom";

const LikeBtn = ({ helmet }) => {
  const { pathname } = useLocation();

  const { likeProducts, setLikeProducts, isAdmin, isUser } =
    useContext(MyContext);

  const nav = useNavigate();

  const handleLike = (products) => {
    if (isAdmin || isUser) {
      if (likeProducts.includes(products)) {
        setLikeProducts(likeProducts.filter((helmet) => helmet !== products));
      } else {
        setLikeProducts([...likeProducts, products]);
      }
    } else {
      alert("Your are not logged in! Please Login to continue");
      nav("/signin");
    }
  };

  const handleUnlike = (product) => {
    setLikeProducts(likeProducts.filter((helmet) => helmet !== product));
  };

  return (
    <div className="likeBtn">
      {pathname !== "/wishlist" ? (
        <button onClick={() => handleLike(helmet)}>
          {likeProducts.includes(helmet) ? (
            <img src="/like.png" alt="" />
          ) : (
            <img src="/unlike.png" alt="" />
          )}
        </button>
      ) : (
        <div className="remove">
          <button onClick={() => handleUnlike(helmet)}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default LikeBtn;
