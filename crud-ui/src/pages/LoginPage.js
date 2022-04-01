import "../scss/login.scss";
import "antd/dist/antd.css";
import { GoogleOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import { Spin } from "antd";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { loadUser } from "../actions";
import { useNavigate } from "react-router-dom";

function LoginPage({ loadUser, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(Cookies.get("token"));
  const navigate = useNavigate();
  const redirectToGoogle = async () => {
    const googleLoginURL = `${process.env.REACT_APP_CORE_SERVER}auth/login/google`;
    const newWindow = window.open(googleLoginURL, "_black", "width=500,height=600");
    if (newWindow) {
      setIsOpen(true);
      const timer = setInterval(() => {
        if (newWindow.closed) {
          setIsOpen(false);
          setToken(Cookies.get("token"));
          if (timer) {
            clearInterval(timer);
          }
        }
      }, 500);
    }
  };

  useEffect(() => {
    if (token) loadUser(token);
  }, [token]);

  useEffect(() => {
    if (user.isSignedIn) navigate("/principalPage");
  }, [user]);

  return (
    <Spin spinning={isOpen || user.isloading}>
      <div className="container">
        <h3>Login with Google+ to interact with the CRUD Challenge</h3>
        <button className="google btn" onClick={redirectToGoogle}>
          <GoogleOutlined /> Login with Google +
        </button>
      </div>
    </Spin>
  );
}

const mapStateToProp = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProp, { loadUser })(LoginPage);
