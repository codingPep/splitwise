import React, { useState, useEffect } from "react";
import API from "../utils/serverApi";
import axios from "axios";
import { Card, Feed } from "semantic-ui-react";
import AddFriends from "../components/AddFriend";

function Friends(props) {
  const [friendsList, setFriendsList] = useState([
    { name: "no one", image: "" },
  ]);
  useEffect(() => {
    async function fetch() {
      const response = await axios.post(API.baseURL + "/friend/fetch", {
        id: props.user.id,
      });
      // console.log("friends list", response.data);
      setFriendsList(response.data);
    }
    fetch();
  }, [props.val]);
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Card style={{ marginLeft: "144px" }}>
        <Card.Content>
          <Card.Header>
            Friends
            <img
              src="https://www.freeiconspng.com/uploads/user-add-icon---shine-set-add-new-user-add-user-30.png"
              className="add-friend"
              onClick={() => setModalShow(true)}
            />
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            {friendsList.map((friend) => (
              <Feed.Event>
                <Feed.Label image={friend.image} />
                <Feed.Content>
                  <Feed.Date content="1 days ago" />
                  <Feed.Summary>
                    {/* You added <a>Elliot Baker</a> to your <a>musicians</a> group. */}
                    {friend.name}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            ))}
          </Feed>
        </Card.Content>
      </Card>
      <AddFriends show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Friends;
