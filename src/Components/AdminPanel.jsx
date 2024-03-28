import Navbar from "./Navbar";
import { useContext } from "react";
import { useState } from "react";
import { MyContext } from "../Context";
import "./CSS/All.css";
import Footer from "./Footer";
import { useEffect } from "react";
import "./CSS/AdminPanel.css";
import { Link } from "react-router-dom";

const All = () => {
  const { allHelmets, setAllHelmets, setSearchQuery } = useContext(MyContext);

  const [filteredProducts, setFilteredProducts] = useState(allHelmets);

  const [selectedBrand, setSelectedBrand] = useState("");

  const [newHelmet, setNewHelmet] = useState({
    img: "",
    title: "",
    company: "",
    color: "",
    category: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHelmet((prevHelmet) => ({
      ...prevHelmet,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFilteredProducts(allHelmets);
  }, [allHelmets]);

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

  const handleRemoveHelmet = (index) => {
    const updatedHelmets = allHelmets.filter(
      (_, helmetIndex) => helmetIndex !== index
    );
    setAllHelmets(updatedHelmets);
  };

  const handleEditHelmet = (index) => {
    setEditIndex(index);
    setNewHelmet(allHelmets[index]);
  };

  const handleAddHelmet = () => {
    if (Object.values(newHelmet).every((value) => value !== "")) {
      if (editIndex !== null) {
        const updatedHelmets = allHelmets.map((helmet, index) =>
          index === editIndex ? newHelmet : helmet
        );
        setAllHelmets(updatedHelmets);
        setEditIndex(null);
      } else {
        const newId =
          allHelmets.length > 0
            ? Number(allHelmets[allHelmets.length - 1].id) + 1
            : 1;
        const helmetWithId = { ...newHelmet, id: newId };
        setAllHelmets((prevHelmets) => [...prevHelmets, helmetWithId]);
      }
      setNewHelmet({
        img: "",
        title: "",
        newPrice: "",
        company: "",
        color: "",
        category: "",
      });
    }
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div className="addProduct">
        <div className="addproductTitle">
          <h1>Add/Edit Products:</h1>
          <Link to="/manageusers">Manage Users</Link>
        </div>
        <table>
          <tbody>
            <tr>
              <th>
                <label>Image URL:</label>
              </th>
              <td>
                <input
                  type="text"
                  name="img"
                  value={newHelmet.img}
                  onChange={handleInputChange}
                />
              </td>
              <th>
                <label>Title:</label>
              </th>
              <td>
                <input
                  type="text"
                  name="title"
                  value={newHelmet.title}
                  onChange={handleInputChange}
                />
              </td>
            </tr>

            <tr>
              <th>
                <label>Price:</label>
              </th>
              <td>
                <input
                  type="text"
                  name="newPrice"
                  value={newHelmet.newPrice}
                  onChange={handleInputChange}
                />
              </td>
              <th>
                <label>Company:</label>
              </th>
              <td>
                <input
                  type="text"
                  name="company"
                  value={newHelmet.company}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>Color:</label>
              </th>
              <td>
                <input
                  type="text"
                  name="color"
                  value={newHelmet.color}
                  onChange={handleInputChange}
                />
              </td>

              <th>
                <label>Category:</label>
              </th>
              <td>
                <th></th>
                <td>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={newHelmet.category}
                    onChange={handleInputChange}
                    list="categories"
                    className="category-input"
                  />
                  <datalist id="categories">
                    <option value="OffRoad" />
                    <option value="FullFace" />
                    <option value="HalfFace" />
                  </datalist>
                </td>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="addProductBtn">
          <button type="button" onClick={handleAddHelmet}>
            {editIndex !== null ? "Edit Helmet" : "Add New Helmet"}
          </button>
        </div>
      </div>

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
      </div>

      <div className="container">
        {filteredProducts.map((helmet, index) => (
          <li key={index}>
            <div className="wrapper">
              <div className="wrapper-img">
                <img src={helmet.img} alt="img" />
              </div>
              <div className="text">
                <p>{helmet.title}</p>
                <p>{helmet.company}</p>
                <p>{helmet.category}</p>
                <p>{helmet.newPrice}</p>
              </div>
              <div className="editRemovebtns">
                <button
                  type="button"
                  onClick={() => handleEditHelmet(index)}
                  className="btn1"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveHelmet(index)}
                  className="btn2"
                >
                  Remove
                </button>
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
