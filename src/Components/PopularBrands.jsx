import './CSS/PopularBrands.css'
import { useContext } from 'react'
import { MyContext } from '../Context'
import { Link } from 'react-router-dom'


const PopularBrands = () => {


    const { popularBrandsHelmets } = useContext(MyContext)


    return (
        <>
            <div className="title">
                <h1>POPULAR BRANDS</h1>
                <div className="line"></div>
            </div>




            <div className="container1">
                {popularBrandsHelmets.map((helmet, index) => (
                    <li key={index}>

                        <div className="wrapper1">
                                <img src={helmet.image} alt="img" />
                                <div className="text">
                                    <p className='brandName'>{helmet.brand.toUpperCase()}</p>
                                    <p className='brandDescription'>{helmet.description}</p>
                                </div>
                                <button><Link to={`/all?brand=${helmet.brand.toLowerCase()}`} style={{ textDecoration: "none", color: "white" }}>View all</Link></button>
                            </div>
                    </li>
                ))}
            </div>







        </>

    )
}

export default PopularBrands