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
      <Col lg={4} md={8} xs={12} style={{textAlign:"center", maxHeight:"300px"}} key={book._id}>
        <a href={`/book/${book._id}`}>
          <div
          >
            <img
              style={{
                maxWidth:"100%",
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

  return (
    <div>
      <img src="./good.png" style={{ width: "100%" }} alt="banner"></img>
      <div
        style={{
          maxWidth: "100%",
          margin: "2rem auto"
        }}
      >
        <Title level={2}>최근 올라온 책</Title>
        <hr />
        <Row gutter={[16, 32]}>{renderCards}</Row>
      </div>
    </div>
  );
}

export default LandingPage;
