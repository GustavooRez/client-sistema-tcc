// Neste arquivo é definido a função de logout do sistema
import { useNavigate } from "react-router-dom";
import React from "react";

function Logout() {
  const navigate = useNavigate();
  React.useEffect(() => {
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("username");
      localStorage.removeItem("usertype");
      localStorage.removeItem("userId");
      localStorage.removeItem("userTccId");
      localStorage.removeItem("userTccStatus");
      return navigate("/");
  },[])
  return (<div></div>);
}

export default Logout;
