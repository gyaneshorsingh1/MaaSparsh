import React, { useState } from 'react';
import "./Header.css";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material"; // Updated import for SpeedDial and Backdrop
import DashboardIcon from "@mui/icons-material/Dashboard"; // Updated import for DashboardIcon
import PersonIcon from "@mui/icons-material/Person"; // Updated import for PersonIcon
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Updated import for ExitToAppIcon
import ListAltIcon from "@mui/icons-material/ListAlt"; // Updated import for ListAltIcon
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/userAction';
import { FaShoppingCart } from 'react-icons/fa';


import { useSelector } from 'react-redux';


const UserOptions = ({ user }) => {

  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const alert = useAlert();
  const dispatch = useDispatch();

  if(!user){
    return null
  }

  // Functions for handling navigation and actions
  function dashboard() {
    setOpen(false); // Close SpeedDial
    navigate("/admin/dashboard");
  }

  function orders() {
    setOpen(false); // Close SpeedDial
    navigate("/orders");
  }

  function account() {
    setOpen(false); // Close SpeedDial
    navigate("/account");
  }
  function cart() {
    setOpen(false); // Close SpeedDial
    navigate("/cart");
  }

  function logoutUser() {
    setOpen(false); // Close SpeedDial
    dispatch(logout());
    alert.success("Logout Successfully");
    navigate("/login");
  }

  // Defining options for SpeedDial
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <FaShoppingCart style={{color:cartItems.length>0?"tomato":"unset"}} />, name: `Cart(${cartItems.length})`, func: cart },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "11" }}
        direction='down'
        className='speedDial'
        icon={<img
          className='speedDialIcon'
          src={user?.avatar?.url ? user.avatar.url : "/Profile.png"} // Correct path to default image
          alt='Profile'
        />}
      >
        {options.map((item) => (
          <SpeedDialAction 
            icon={item.icon} 
            tooltipTitle={item.name} 
            onClick={item.func} 
            tooltipOpen={window.innerWidth<=600 ? false : true }
            key={item.name} // Add a unique key to each SpeedDialAction for better rendering
          />
        ))}
      </SpeedDial>
    </>
  );
}

export default UserOptions;
