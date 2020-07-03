import React, { useState, useEffect } from "react";
import API from "../utils/serverApi";
import axios from "axios";
import Settle from "../components/Settle";
import Create from "../components/Create";
import AddFriends from "../components/AddFriend";
import DisplayProduct from "./DisplayProduct";
function Dashboard(props) {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [balance, setBalance] = useState(props.user.balance);
  useEffect(() => {
    props.reload(Math.random());
  }, [props.change, modalShow1, modalShow2]);
  useEffect(() => {
    async function fetch() {
      const response = await axios.post(API.baseURL + "/user/balance", {
        id: props.user.id,
      });
      // console.log("BALANACE AMOUNT", response.data.balance);
      setBalance(response.data.balance);
    }
    fetch();
  }, [balance, modalShow]);
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="header-dash">Dashboard</h2>
        <div className="button-group">
          <button className="settle" onClick={() => setModalShow(true)}>
            <b>Settle up</b>
          </button>
          <button className="create" onClick={() => setModalShow1(true)}>
            <b>Create Bill</b>
          </button>
          <button className="add" onClick={() => setModalShow2(true)}>
            <b>Add Friend</b>
          </button>
        </div>
      </div>
      <div className="balance-sheet">
        <div className="balance">Remaining Balance</div>
        <p className="cost">$ {balance}</p>
      </div>
      <div className="display-sheet">
        <DisplayProduct id={props.change} user={props.user} />
      </div>
      <Settle
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={props.user}
      />
      <Create
        show={modalShow1}
        onHide={() => setModalShow1(false)}
        user={props.user}
      />
      <AddFriends
        show={modalShow2}
        onHide={() => setModalShow2(false)}
        user={props.user}
      />
    </div>
  );
}

export default Dashboard;
