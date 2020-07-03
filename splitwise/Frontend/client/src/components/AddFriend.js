import React, { useState, useEffect } from "react";
import API from "../utils/serverApi";
import axios from "axios";
import { Button, ButtonToolbar, Modal, Form } from "react-bootstrap";
import { Dropdown } from "semantic-ui-react";

function AddFriend(props) {
  const [id, setId] = useState();
  const [friendsOption, setFriendsOption] = useState([
    {
      key: "Elliot Fu",
      text: "Elliot Fu",
      value: "Elliot Fu",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
      },
    },
  ]);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    async function fetch() {
      const response = await axios.post(API.baseURL + "/friend/option", {
        id: props.user.id,
      });
      if (response.data != "No friends!!!") {
        response.data.map((d) => {
          var t = {
            key: d.name,
            text: d.name,
            value: d.name,
            image: {
              avatar: true,
              src: d.image,
            },
          };
          setArr((prev) => [...prev, t]);
        });

        setFriendsOption(response.data);
      }
    }
    fetch();
  }, []);
  async function check() {
    // console.log("--> jaya", id);
    const response = await axios.post(API.baseURL + "/friend/add", {
      main: props.user.id,
      friend: id,
    });
    // console.log("-->", response.data);
    if (response.data) {
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
            Add Friend
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "23px",
          }}
        >
          {/* <Dropdown
            placeholder="Select Friend"
            fluid
            selection
            options={arr}
            onSelect={check()}
            style={{ width: "15rem", marginLeft: "20px" }}
          /> */}

          <select
            onChange={(e) => setId(e.target.value)}
            className="select-class"
          >
            {friendsOption.map((d) => (
              <option value={d.id}>{d.name}</option>
            ))}
          </select>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onHide} style={{ background: "#25bbaead" }}>
            Close
          </Button>
          <Button variant="danger" onClick={check}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddFriend;
