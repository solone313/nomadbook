import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Col, Typography, Row, Input ,  Result  } from "antd";
import Axios from "axios";
import { RiseOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Meta } = Card;
const { Search } = Input;

function LandingPage(props) {
  const [books, setbooks] = useState([]);
  const [reviews, setreviews] = useState(0)
  
  useEffect(() => {
    Axios.get("/api/book/getbooks").then(response => {
      if (response.data.success) {
        setbooks(response.data.books);
        // console.log('/api/book/getbooks',response.data.books[0])
      } else {
        alert("책 가져오기를 실패 했습니다.");
      }
    });
    Axios.get("/api/comment/getCommentscount").then(response => {
      if (response.data.success) {
        setreviews(response.data.count);
        // console.log('/api/book/getbooks',response.data.books[0])
      } else {
        alert("리뷰 가져오기를 실패 했습니다.");
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

  function onSearch(value) {
    if(value.replace(/ /gi, "")===""){ 
      alert("검색을 입력해주세요."); return false; 
    }
    let path = `/search?value=${value}`;
    props.history.push(path);
    window.location.reload(false);
  }

  return (
    <div>
      <div style={{height:"550px",backgroundImage: `url('./81744.jpg')`, backgroundSize:"100% 550px", paddingTop:"100px"}}>
      <center style={{marginTop:"50px"}}>
      <h1>Go read Go review</h1>
      <br/><br/>
      <Search
        placeholder="책 이름, 작가, 출판사, 장르를 검색해주세요"
        onSearch={value => onSearch(value)}
        style={{ width: "100%",maxWidth: "650px",height:"50px" }}
      />
      <Result
        icon={<RiseOutlined style={{ fontSize: '30px', color: '#08c' }}/>}
        title = {<p>{`현재 ${books.length}건의 책과 ${reviews}건의 리뷰가 쌓였어요!!`}</p>}
      />
      </center>
      </div>

      <div
        style={{
          maxWidth: "100%",
          margin: "2rem auto",
          paddingRight: "15%",
          paddingLeft: "15%",
        }}
      >
        <Title level={2}>최근 올라온 책</Title>
        <hr />
        <Row gutter={[16, 32]}>{renderCards}</Row>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);
