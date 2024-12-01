import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import MyOrders from "../Order/Myorders";
import { FaArrowAltCircleRight } from "react-icons/fa";
import leaf from "../../images/leaf.png"
const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <div>No user data available. Please log in.</div>; // Explicit fallback
  }

  return (
    <>
      <div className="profileContainer">
        <img className="profile-leaf" src={leaf} alt="" />
        <img className="profile-leaf-2" src={leaf} alt="" />
        <h2 className="quick sand-blacks">Account</h2>
        <div className="accountContainer">
          <div>
            <p className="holder-name quick sand-regular">Holder: {user.name}</p>
            <p className="joinedon quick sand-regular">Joined On: {String(user.createdAt).split("T")[0]}</p>
          </div>
          <div>
            <p className="holder-email">{user.email}</p>
          </div>
          <div className="logout-account">
            <div>
            <Link to="/">Log Out <span><FaArrowAltCircleRight color="#e87044" /> </span></Link>
            </div>
          </div>
        </div>
        <div>
          <MyOrders />
        </div>
      </div>
    </>
  );
};

export default Profile;
