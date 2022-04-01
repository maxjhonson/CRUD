import React from "react";
import { useEffect } from "react";

function LoginSucess(props) {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 100);
  });
  return <div></div>;
}

export default LoginSucess;
