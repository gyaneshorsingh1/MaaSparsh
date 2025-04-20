import React from 'react'
import "./Loader.css";
import logo from "../../../images/logo-without-text.png";
const Loader = () => {
  return (
    <div className='loading'>
        <div>
          <div></div>
          <img className="logo" src={logo}  alt="" />
        </div>
    </div>
  )
}

export default Loader