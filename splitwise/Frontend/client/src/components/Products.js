import React, { useState, useEffect } from "react";
import API from "../utils/serverApi";
import axios from "axios";
import { Card, Feed } from "semantic-ui-react";
function Products(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log("fetch data");
    async function fetch() {
      const response = await axios.post(API.baseURL + "/product/fetch", {
        id: props.user.id,
      });
      // console.log("product details response===>", response.data);
      setProducts(response.data);
    }
    fetch();
  }, [props.val]);
  function clicking(id) {
    props.click(id);
  }
  return (
    <>
      <Card style={{ marginLeft: "144px" }}>
        <Card.Content>
          <Card.Header>Products</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            {products.map((product) => (
              <Feed.Event
                style={{
                  marginBottom: "20px",
                  background: "#9f868614",
                  marginBottom: "20px",
                  border: "groove",
                  borderWidth: "1px",
                  borderColor: "#80808033",
                }}
              >
                <Feed.Label image="https://shopping.philip-popov.eu/web/images/Product11.png" />
                <Feed.Content>
                  {/* <Feed.Date content="1 day ago" /> */}
                  <Feed.Summary>
                    <a onClick={() => clicking(product.id)}>{product.name}</a>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            ))}
          </Feed>
        </Card.Content>
      </Card>
    </>
  );
}

export default Products;
