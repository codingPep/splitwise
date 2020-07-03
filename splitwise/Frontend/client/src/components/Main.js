import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import "../assets/main.css";
import Render from "./Render";
function Main(props) {
  const location = useLocation();
  const [user, setUser] = useState({
    id: location.state.detail.id,
    name: location.state.detail.name,
    balance: location.state.detail.balance,
    image: location.state.detail.image,
  });
  return (
    <>
      <Header user={user} />
      <Render user={user} />
    </>
  );
}

export default Main;
