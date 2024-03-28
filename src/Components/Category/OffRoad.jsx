import Navbar from '../Navbar'
import { useContext, useEffect } from 'react'
import { MyContext } from '../../Context'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'
import LikeBtn from "../LikeBtn"
import AddToCartBtn from "../AddToCartBtn"

const OffRoad = () => {
  const { allHelmets, setSearchQuery } = useContext(MyContext)

  const filteredOffRoadProduct = allHelmets.filter((product) => product.category.toLowerCase() === "offroad")

  const [filteredOffRoadProducts, setFilteredOffRoadProducts] = useState(filteredOffRoadProduct)

  const nav = useNavigate()

  const [originalFilteredOffRoadProducts, setOriginalFilteredOffRoadProducts] = useState(filteredOffRoadProduct);

  useEffect(() => {
    setFilteredOffRoadProducts(originalFilteredOffRoadProducts);
  }, [originalFilteredOffRoadProducts]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredOffRoadResults = originalFilteredOffRoadProducts.filter((product) => {
      const { title, company, category } = product
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        company.toLowerCase().includes(query.toLowerCase()) ||
        category.toLowerCase().includes(query.toLowerCase())
      )
    })
    setFilteredOffRoadProducts(filteredOffRoadResults)
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div className="container">
        {filteredOffRoadProducts.map((helmet, index) => (
          <li key={index}>
            <div className="wrapper">
              <Link to={`/OffRoad/${helmet.id}`} style={{ textDecoration: "none", color: "black" }}>
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

export default OffRoad
