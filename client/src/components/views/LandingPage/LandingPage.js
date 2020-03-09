import React, { useEffect, useState } from "react";
import { Card, Col, Typography, Row } from "antd";
import Axios from "axios";
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [books, setbooks] = useState([]);
  useEffect(() => {
    Axios.get("/api/book/getbooks").then(response => {
      if (response.data.success) {
        setbooks(response.data.books);
        // console.log('/api/book/getbooks',response.data.books[0])
      } else {
        alert("책 가져오기를 실패 했습니다.");
      }
    });
  }, []);

  const renderCards = books.map((book, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={book._id}>
        <a href={`/book/${book._id}`}>
          <div
            style={{
              position: "relative"
            }}
          >
            <img
              style={{
                width: "200px",
                height: "280px"
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

  return (
    <div>
      <img src="./good.png" style={{ width: "100%" }} alt="banner"></img>
      <div
        style={{
          width: "85%",
          margin: "3rem auto"
        }}
      >
        <Title level={2}>최근 올라온 책</Title>
        <hr />
        <Row gutter={[32, 16]}>{renderCards}</Row>
      </div>
    </div>
  );
}

export default LandingPage;
