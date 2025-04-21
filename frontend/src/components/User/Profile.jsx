import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import MyOrders from "../Order/Myorders";
import { FaArrowAltCircleRight } from "react-icons/fa";
import leaf from "../../images/leaf-2.png";
import { logout } from '../../actions/userAction.jsx';
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <div>No user data available. Please log in.</div>;
  }

  return (
    <>
      <MetaData title={`${user.name}'s Profile`} />
      <div className="profileContainer">
        <img className="profile-leaf" src={leaf} alt="" />
        <img className="profile-leaf-2" src={leaf} alt="" />
        <h1>Account</h1>
        <div className="accountContainer">
          <div>
            <p className="holder-name quick sand-regular">
              Holder: {user.name}
            </p>
            <p className="joinedon quick sand-regular">
              Joined On: {String(user.createdAt).split("T")[0]}
            </p>
          </div>
          <div>
            <p className="holder-email">{user.email}</p>
          </div>
          <div className="logout-account">
            <div>
              <button onClick={logoutUser} className="logout-link">
                Log Out <span><FaArrowAltCircleRight color="#e87044" /></span>
              </button>
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
