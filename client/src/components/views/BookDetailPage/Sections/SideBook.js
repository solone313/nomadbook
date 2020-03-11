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
        style={{ display: "flex", marginBottom: "1rem", padding: "0 2rem" }}
      >
<<<<<<< HEAD
        <div style={{ width: "50%", marginRight: "1rem" }}>
=======
        <div style={{ width: "40%", marginRight: "1rem" }}>
>>>>>>> 71548319366157399a1665e4f1770302e440e692
          <a href={`/book/${book._id}`}>
            <img
              style={{ width: "100%", height: "100%" }}
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
<<<<<<< HEAD
      <div style={{ marginTop: "3rem" }}>{renderSideBook}</div>
=======
      <div className="Side_list" style={{ marginTop: "3rem" }}>{renderSideBook}</div>
>>>>>>> 71548319366157399a1665e4f1770302e440e692
    </React.Fragment>
  );
}

export default SideBook;
