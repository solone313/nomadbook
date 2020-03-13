import React, { useEffect, useState } from "react";
import Axios from "axios";

function SideBook() {
  const [SideBook, setSideBook] = useState([]);
  useEffect(() => {
    Axios.get("/api/book/getsidebooks").then(response => {
      if (response.data.success) {
        setSideBook(response.data.books);
      } else {
        alert("책 가져오기를 실패 했습니다.");
      }
    });
  }, []);

  const renderSideBook = SideBook.map((book, index) => {
    return (
      <div
        key={book._id}
        style={{ display: "inline-block", maxWidth: "100%", marginBottom: "1rem",marginRight:"1rem"}}
      >
        <div style={{ width: "100%" }}>
          <a href={`/book/${book._id}`}>
            <img
              style={{height:"100px",width:"70px"}}
              src={`${book.filePath}`}
              alt="thumbnail"
            />
          </a>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div style={{ marginTop: "5rem"}}>{renderSideBook}</div>
    </React.Fragment>
  );
}

export default SideBook;
