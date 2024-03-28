import Navbar from './Navbar'
import './CSS/HelmetPage.css'
import Footer from './Footer'
import { useContext } from 'react'
import { MyContext } from '../Context'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LikeBtn from "./LikeBtn"
import AddToCartBtn from "./AddToCartBtn"

const HelmetPage = () => {
  const { productId } = useParams();
  const nav = useNavigate()



  const { allHelmets } = useContext(MyContext)



  const clickedProduct = [...allHelmets.filter((helmet) => helmet.id === productId)]
  


  return (
    <>
      <Navbar />
      {clickedProduct.map((helmet, index) =>
        <div className="productPage" key={index}>
          <div className="productImg" >
            <div className="wrapper-img">
              <img src={helmet.img} alt="img" />
            </div>
          </div>
          <div className="productDetails">
            <h1>{helmet.title}</h1>
            <div className="toflex" style={{ display: "flex" }}>
              <h2 className='mrp'>{`M.R.P ₹${helmet.newPrice}`}</h2>
              <p style={{ marginLeft: "10px" }}></p>
            </div>
            <h4>{helmet.category}</h4>
            <div className="productDetailsBtns">
              <div className="btns1">
                <LikeBtn helmet={helmet} />
                <AddToCartBtn helmet={helmet} />
              </div>
              <div className="buynow">
                <Link to="/shoppingbag">
                <button onClick={helmet={helmet}}>Buy Now</button>
                </Link>
              </div>
            </div>



          </div>

        </div>
      )}



      <Footer />
    </>

  )
}

export default HelmetPage