import Navbar from './Navbar';
import Hero from './CoverPic';
import PopularBrands from './PopularBrands';
import Footer from './Footer';
import HelmetAwarenessPage from './HelmetAwarenessPage';


const Home = () => {

  return (
    <>
      <Navbar />
      <Hero />
      {/* <HelmetAwarenessPage/> */}
      <PopularBrands />
      <Footer />
    </>
  )
}

export default Home