import React from "react";

function Header(props) {
  return (
    <div className="top">
      <img className="logo" src="https://dev.splitwise.com/images/logo.svg" />
      <p className="logo-name">
        <b>SPLIT</b>
      </p>
      {/* <button className="logout">LOGOUT</button> */}
      <p className="username">
        <i>{props.user.name}</i>
      </p>
      <img className="avatar" src={props.user.image} />
    </div>
  );
}

export default Header;
