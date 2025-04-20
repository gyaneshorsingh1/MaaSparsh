import React, { useState } from "react";
import "./Shipping.css";
import "./ConfirmOrder.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction.jsx";
import MetaData from "../layout/MetaData.jsx";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps.jsx";
import BroughtTogether from "./BroughtTogether.jsx";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  // State for shipping form fields
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "India");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  // Calculations for order summary
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = 0;
  const totalPrice = subtotal + shippingCharges;

  // Handle form submission
  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number should be 10 digits long");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );

    // Save order info in session storage
    const orderInfo = {
      subtotal,
      shippingCharges,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));

    // Navigate to the next step (payment)
    navigate("/shipping/confirm");
  };

  return (
    <>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shipping-title">Account</h2>
          <div className="contact-details">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>

          <h2 className="shippingHeading">Delivery Details</h2>

          <form className="shippingForm" onSubmit={shippingSubmit}>
            <div>
              <PublicIcon />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Full Address, Home number"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                maxLength="10"
              />
            </div>

            

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>

        <div className="products-and-amount">
          <h2>Order Summary</h2>
          <div className="cartItemContainer">
  {cartItems &&
    cartItems.map((item) => (
      <div key={item.product}>
        <span>
          <img src={item.image} alt={item.name} />
          <Link to={`/product/${item.product}`}>
            {item.name} <span className="itemQuantity">( {item.quantity} ) </span> <br />
            <span>200ml</span>
          </Link>
        </span>
        <span className="subtotalSection">₹{item.price * item.quantity}</span>
      </div>
    ))}
</div>

          <div className="orderSummary">
            <div className="sub-total-order">
              <p>Sub-Total:</p>
              <span>₹{subtotal}</span>
            </div>
            <div className="sub-total-order">
              <p>Shipping Charges:</p>
              <span>₹0(Free Delivery)</span>
            </div>
            <div className="orderSummaryTotal">
              <p className="total-price">
                Total: <span>₹{totalPrice}</span>
              </p>
              <p className="taxes-included-info">
                (MRP Inclusive of all Taxes)
              </p>
            </div>
          </div>
          <div className="brought-together">
            <h2>Frequently Brought together</h2>
            <BroughtTogether />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
