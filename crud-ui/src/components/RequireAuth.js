import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

function RequireAuth({ children, user }) {
  if (user.isSignedIn) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

const mapStateToProp = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProp, {})(RequireAuth);
