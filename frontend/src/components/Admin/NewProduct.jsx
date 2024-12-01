import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { toast } from "react-toastify";
import { Button } from "@mui/material"; // Updated import for Button
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree"; // Updated import for icons
import DescriptionIcon from "@mui/icons-material/Description"; // Updated import for icons
import StorageIcon from "@mui/icons-material/Storage"; // Updated import for icons
import SpellcheckIcon from "@mui/icons-material/Spellcheck"; // Updated import for icons
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Updated import for icons

import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // New state for aboutProducts and productDetails
  const [aboutProducts, setAboutProducts] = useState([{ title: "", description: "" }]);
  const [productDetails, setProductDetails] = useState([{ title: "", description: "" }]);

  const categories = [
    "Bath Rituals",
    "Everyday Wellness",
    "Feeding Rituals",
    "Organic Clothing",
    "Baby Nursery",
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    // Set aboutProducts and productDetails as arrays of objects
    myForm.append("aboutProducts", JSON.stringify(aboutProducts)); // Use append instead of set
    myForm.append("productDetails", JSON.stringify(productDetails)); // Use append instead of set

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };


  // Handle adding/removing fields for aboutProducts
  const handleAboutProductChange = (index, e) => {
    const newAboutProducts = [...aboutProducts];
    newAboutProducts[index][e.target.name] = e.target.value;
    setAboutProducts(newAboutProducts);
  };

  const addAboutProductField = () => {
    setAboutProducts([...aboutProducts, { title: "", description: "" }]);
  };

  const removeAboutProductField = (index) => {
    const newAboutProducts = aboutProducts.filter((_, i) => i !== index);
    setAboutProducts(newAboutProducts);
  };

  // Handle adding/removing fields for productDetails
  const handleProductDetailChange = (index, e) => {
    const newProductDetails = [...productDetails];
    newProductDetails[index][e.target.name] = e.target.value;
    setProductDetails(newProductDetails);
  };

  const addProductDetailField = () => {
    setProductDetails([...productDetails, { title: "", description: "" }]);
  };

  const removeProductDetailField = (index) => {
    const newProductDetails = productDetails.filter((_, i) => i !== index);
    setProductDetails(newProductDetails);
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>


                       {/* About Products Fields */}
                       <div className="product-details-container">
              <h4>About Products</h4>
              {aboutProducts.map((field, index) => (
                <div key={index} className="product-detail-field">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={field.title}
                    onChange={(e) => handleAboutProductChange(index, e)}
                    required
                    className="input-field"
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={field.description}
                    onChange={(e) => handleAboutProductChange(index, e)}
                    required
                    className="textarea-field"
                  ></textarea>
                  {index !== 0 && (
                    <button
                      className="remove-btn"
                      type="button"
                      onClick={() => removeAboutProductField(index)}
                    >
                      Remove About Product
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addAboutProductField} className="add-btn">
                Add About Product
              </button>
            </div>


            {/* Product Details Fields */}
            <div className="product-details-container">
              <h4>Product Details:</h4>
              {productDetails.map((field, index) => (
                <div key={index} className="product-detail-field">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={field.title}
                    onChange={(e) => handleProductDetailChange(index, e)}
                    required
                    className="input-field"
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={field.description}
                    onChange={(e) => handleProductDetailChange(index, e)}
                    required
                    className="textarea-field"
                  ></textarea>
                  {index !== 0 && (
                    <button
                      className="remove-btn"
                      type="button"
                      onClick={() => removeProductDetailField(index)}
                    >
                      Remove Detail
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addProductDetailField} className="add-btn">
                Add Product Detail
              </button>
            </div>
 

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={createProductImagesChange}
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Avatar Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
