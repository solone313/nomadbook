import React, { useEffect, useState } from "react";
import { Card, Col } from "antd";
import axios from "axios";
const { Meta } = Card;

function SearchPage(props) {
  const [searchResult, setsearchResult] = useState([]);

  const value = props.match.params.value;
  const variables = {
    value: value
  };
  useEffect(() => {
    axios.post("/api/book/searchresult", variables).then(response => {
      if (response.data.success) {
        setsearchResult(response.data.searchresult);
      } else {
        alert(" 저장에 실패했습니다 이유: " + response.data.err);
      }
    });
  }, []);
  const renderCards = searchResult.map((book, index) => {
    return (
      <Col
        lg={4}
        md={8}
        xs={12}
        style={{ textAlign: "center", maxHeight: "300px" }}
        key={book._id}
      >
        <a href={`/book/${book._id}`}>
          <div>
            <img
              style={{
                maxWidth: "100%",
                height: "200px"
              }}
              alt="thumbnail"
              src={`${book.filePath}`}
              crossOrigin="anonymous"
            />
            {/* src={`http://localhost:5000/${book.filePath}`}/> */}
          </div>
          <br />
          <Meta title={book.title} />
        </a>
        <span>
          {book.author}, {book.publisher}
        </span>
        {/* <br />
          <span>평점: {book.rating}</span> */}
      </Col>
    );
  });
  return <div>{renderCards}</div>;
}

export default SearchPage;
