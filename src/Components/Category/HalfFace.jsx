import Navbar from '../Navbar'
import Footer from '../Footer'
import { useContext, useEffect } from 'react'
import { MyContext } from '../../Context'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import LikeBtn from "../LikeBtn"
import AddToCartBtn from "../AddToCartBtn"

const HalfFace = () => {

  const { allHelmets, setSearchQuery } = useContext(MyContext)

  const filteredHalfFaceProduct = allHelmets.filter((product) => product.category.toLowerCase() === "halfface")

  const [filteredHalfFaceProducts, setFilteredHalfFaceProducts] = useState(filteredHalfFaceProduct)
  const nav = useNavigate()

  const [originalFilteredHalfFaceProducts, setOriginalFilteredHalfFaceProducts] = useState(filteredHalfFaceProduct);

  useEffect(() => {
    setFilteredHalfFaceProducts(originalFilteredHalfFaceProducts);
  }, [originalFilteredHalfFaceProducts]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = originalFilteredHalfFaceProducts.filter((product) => {
      const { title, company, category } = product
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        company.toLowerCase().includes(query.toLowerCase()) ||
        category.toLowerCase().includes(query.toLowerCase())
      )
    })
    setFilteredHalfFaceProducts(filteredResults)
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="container">
        {filteredHalfFaceProducts.map((helmet, index) => (
          <li key={index}>
            <div className="wrapper">
              <Link to={`/halfface/${helmet.id}`} style={{ textDecoration: "none", color: "black" }}>
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
  )
}

export default HalfFace
