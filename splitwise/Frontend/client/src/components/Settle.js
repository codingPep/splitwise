import React, { useState, useEffect } from "react";
import { Button, ButtonToolbar, Modal, Form } from "react-bootstrap";
import API from "../utils/serverApi";
import axios from "axios";
import { Dropdown } from "semantic-ui-react";
function Settle(props) {
  const [productOptions, setProductOptions] = useState([
    { pid: 0, name: "none", price: 0 },
  ]);
  const [money, setMoney] = useState(0);
  const [id, setId] = useState(0);
  useEffect(() => {
    async function fetch() {
      const response = await axios.post(API.baseURL + "/product/rent", {
        id: props.user.id,
      });
      console.log("Sharing list", productOptions);
      if (response.data != "No") {
        setProductOptions(response.data);
      }
      // setOption(response.data);
    }
    fetch();
  }, []);
  async function pay() {
    const response = await axios.post(API.baseURL + "/user/update", {
      amount: money,
      id: props.user.id,
    });
    console.log("=====>", response.data);
    setMoney(0);
    props.onHide();
  }
  function check(e) {
    console.log(e.target.value);
    setId(e.target.value);
  }
  return (
    <div>
      <Modal {...props} animation={false} centered>
        <Modal.Header
          closeButton
          style={{
            background: "#25bbaead",
            height: "3rem",
            paddingTop: "7px",
            paddingBottom: "0px",
          }}
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontSize: "1.2rem", color: "white" }}
          >
            Settle-up
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ display: "flex", flexDirection: "row", marginTop: "23px" }}
        >
          <h4 className="h44">You </h4> <p className="pp">paid</p>
          {/* <Dropdown
            placeholder="Select Friend"
            fluid
            selection
            options={friendOptions}
            style={{ width: "15rem" }}
          /> */}
          <select onChange={(e) => check(e)} className="select-class">
            <option value="0">No options</option>
            {productOptions.map((d) => (
              <option value={d.price}>{d.name}</option>
            ))}
          </select>
          <br />
        </Modal.Body>
        {id != 0 ? (
          <a className="infobox" style={{ color: "red" }}>
            you have to pay {id}
          </a>
        ) : null}

        <input
          type="text"
          className="input-money"
          placeholder="$00.00"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
        />
        <Modal.Footer>
          <Button onClick={props.onHide} style={{ background: "#25bbaead" }}>
            Close
          </Button>
          <Button variant="danger" onClick={pay}>
            Settle
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Settle;
