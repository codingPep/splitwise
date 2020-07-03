import React, { useState, useEffect } from "react";
import { Button, ButtonToolbar, Modal, Form } from "react-bootstrap";
import { Dropdown } from "semantic-ui-react";
import API from "../utils/serverApi";
import axios from "axios";
import { Multiselect } from "multiselect-react-dropdown";

function Create(props) {
  const [selectedValue, setSelectedValue] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [option, setOption] = useState([]);
  useEffect(() => {
    async function fetch() {
      const response = await axios.post(API.baseURL + "/friend/fetch", {
        id: props.user.id,
      });
      setOption(response.data);
    }
    fetch();
  }, []);
  async function onSelect(selectedList, selectedItem) {
    setSelectedValue(selectedList);
  }
  async function add() {
    // console.log("details going to be added!!!!", );
    const res = await axios.post(API.baseURL + "/product/add", {
      name: name,
      price: price,
      invities: selectedValue,
      owner: props.user.id,
    });
    console.log("==========>response", res.data);
    if (res.data == "success") {
      setName("");
      setPrice(0);
      setSelectedValue([]);
      props.onHide();
    }
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
            Create a bill
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "23px",
          }}
        >
          <p>Invite</p>

          <Multiselect
            options={option}
            selectedValues={setSelectedValue}
            onSelect={onSelect}
            displayValue="name"
            style={{ background: "#25bbaead" }}
          />
          <input
            type="text"
            className="input-money-create"
            placeholder="Enter Description"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="input-money-create"
            placeholder="$00.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onHide} style={{ background: "#25bbaead" }}>
            Close
          </Button>
          <Button variant="danger" onClick={add}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Create;
