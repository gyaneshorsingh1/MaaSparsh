import React, { useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, useLocation } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, googleLogin, login, register } from "../../actions/userAction";
import { toast } from "react-toastify";


import { auth, provider } from "../../Firebase.jsx";
import { signInWithPopup } from "firebase/auth";



import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import XIcon from '@mui/icons-material/X'; // Used as "X" icon



import leaf1 from "../../images/leaf.png";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    toast.success("Login Successful!");
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const name = user.displayName;
      const uid = user.uid;
      const email= user.email;
      

      // Optional: Get Firebase ID token (for backend)
      const idToken = await user.getIdToken();

      console.log("Firebase ID Token:", idToken);

      dispatch(googleLogin(name,uid,email, idToken));

      console.log("Name:", name);
      console.log("Email:", email);
      console.log("UID:", uid);

      
      // Redirect or update UI here
    } catch (error) {
      console.error("Error during Google login", error);
      console.error(error.message);
    }
  };
  
  // const handlePassLogin = async () => {
  //   // let provider;

  //   // switch (providerName) {
  //   //   case "google":
  //   //     provider = googleProvider;
  //   //     break;
  //   //   case "facebook":
  //   //     provider = facebookProvider;
  //   //     break;
  //   //   case "twitter":
  //   //     provider = twitterProvider;
  //   //     break;
  //   //   default:
  //   //     return;
  //   // }

  //   try {
  //     const result = await signInWithPopup(auth);
  //     const user = result.user;
  //     console.log(`${providerName} login success:`, user);
  //     // Do whatever you need after login (save to DB, redirect, etc.)
  //   } catch (error) {
  //     console.error(`Login failed with ${providerName}:`, error);
  //   }
  // };



  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      toast.error(error);
      console.log(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="LoginSignUpContainer">
            <img loading="lazy" src={leaf1} alt="" className="leaf1-signup" />
            <img loading="lazy" src={leaf1} alt="" className="leaf2-signup" />
            <img loading="lazy" src={leaf1} alt="" className="leaf3-signup" />
            <img loading="lazy" src={leaf1} alt="" className="leaf4-signup" />
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
                <section
                ref={loginTab}>
                  <form
                    className="loginForm"
                    
                    onSubmit={loginSubmit}
                  >
                    <div className="loginEmail">
                      <MailOutlineIcon />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="loginPassword">
                      <LockOpenIcon />
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                    {/* <Link to="/password/forgot">Forget Password</Link> */}
                    <input type="submit" value="Login" className="loginBtn" />
                  </form>
                  <div className="socialLoginButtons LoginSignUpBox ">
                    <p className="orText">or sign in with</p>
                    <button onClick={() => handleGoogleLogin()} className="socialBtn googleBtn">
                      <GoogleIcon className="socialIcon google-icon" />
                      Sign in with Google
                    </button>
                    {/* <button className="socialBtn xBtn">
                      <XIcon className="socialIcon x-icon" />
                      Sign in with X
                    </button>
                    <button  className="socialBtn facebookBtn">
                      <FacebookIcon className="socialIcon fb-icon" />
                      Sign in with Facebook
                    </button> */}
                  </div>
                </section>
                <form
                  className="signUpForm"
                  ref={registerTab}
                  onSubmit={registerSubmit}
                >
                  <div className="signUpName">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      name="name"
                      required
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      name="email"
                      required
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpPassword">
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      name="password"
                      required
                      onChange={registerDataChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Register"
                    className="signUpBtn"
                    disabled={loading ? true : false}
                  />
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginSignUp;
