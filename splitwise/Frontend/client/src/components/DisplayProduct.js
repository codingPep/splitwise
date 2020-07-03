import React, { useState, useEffect } from "react";
import API from "../utils/serverApi";
import axios from "axios";
import { Card, Feed } from "semantic-ui-react";

function DisplayProduct(props) {
  const [product, setProduct] = useState({
    id: 0,
    name: "Product",
    price: 2000,
    uid: 2,
  });
  const [share, setShare] = useState([
    {
      name: "You",
      image: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
    },
  ]);
  const [shareAmount, setShareAmount] = useState(2000);
  useEffect(() => {
    async function fetch() {
      if (props.id != 0) {
        const response = await axios.post(API.baseURL + "/product/details", {
          id: props.id,
        });
        setProduct(response.data);
        setShareAmount(response.data.price);
        const res = await axios.post(API.baseURL + "/product/share", {
          id: response.data.id,
          mainid: props.user.id,
        });
        if (res.data != "No products!!!") {
          var shareAmt = response.data.price / res.data.length;
          setShareAmount(shareAmt.toFixed(2));
          setShare(res.data);
        } else {
          setShare([{ name: "You" }]);
        }
      }
    }
    fetch();
  }, [props.id]);

  return (
    <div class="ui card" id="card-product-details">
      <div class="content" id="content-product-details">
        <div class="header">Product Details</div>
      </div>
      <div class="content">
        <div className="product-details-title">
          <h4 className="simple">{product.name}</h4>
          <p className="product-detail-price">$ {product.price}</p>
        </div>

        {share.map((s) => (
          <Feed
            style={{
              display: "flex",
              paddingBottom: "20px",
              paddingTop: "20px",
            }}
          >
            <Feed.Event>
              <Feed.Label image={s.image} />
              <Feed.Content>
                <Feed.Summary>{s.name}</Feed.Summary>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event style={{ width: "200px" }}>
              <Feed.Content>
                <Feed.Summary>$ {shareAmount}</Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        ))}
      </div>
      {/* <div class="extra content">
        <button class="ui button">Join Project</button>
      </div> */}
    </div>
  );
}

export default DisplayProduct;
