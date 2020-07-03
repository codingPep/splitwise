import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import "../assets/render.css";
import Friends from "./Friends";
import Products from "./Products";
function Render(props) {
  const [count, setCount] = useState(0);
  const [val, setVal] = useState(0);

  function clicked(value) {
    // console.log("====>", value);
    setCount(value);
  }
  function valset(value) {
    setVal(value);
  }
  return (
    <div className="render">
      <div className="lefter">
        <Products click={clicked} val={val} user={props.user} />
        <Friends val={val} user={props.user} />
      </div>
      <div className="righter">
        <Dashboard change={count} reload={valset} user={props.user} />
      </div>
    </div>
  );
}

export default Render;
