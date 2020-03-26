import React, { useEffect, useState } from "react";
import { Card, Col } from "antd";
import axios from "axios";
import queryString from "query-string";
const { Meta } = Card;

function SearchPage({ match, location }) {
  const [searchResult, setsearchResult] = useState([]);
  const [result, setresult] = useState("")
  const query = queryString.parse(location.search);
  const variables = {
    value: query.value
  };
  useEffect(() => {
    axios.post("/api/book/searchresult", variables).then(response => {
      if (response.data.success) {
        setsearchResult(response.data.searchresult);
        if (response.data.searchresult.length===0){
          setresult("검색결과가 없습니다.")
        }else{
          setresult(`${response.data.searchresult.length}건이 검색되었습니다.`)
        }
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
  return <div>{result}<br/>{renderCards}</div>;
}

export default SearchPage;
