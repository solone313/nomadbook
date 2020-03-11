import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import StarRatings from "react-star-ratings";

const { TextArea } = Input;

function Comments(props) {
  const user = useSelector(state => state.user);
  const [Comment, setComment] = useState("");
  const [Rating, setRating] = useState(0);
  const handleChange = e => {
    setComment(e.currentTarget.value);
  };

  const changeRating = (newRating, name) => {
    setRating(newRating);
  };

  const onSubmit = e => {
    e.preventDefault();

    const variables = {
      content: Comment,
      writer: user.userData._id,
      postId: props.postId,
      rating: Rating
    };

    axios.post("/api/comment/saveComment", variables).then(response => {
      if (response.data.success) {
        setComment("");
        props.refreshFunction(response.data.result);
      } else {
        alert("코멘트 저장에 실패했습니다 이유: " + response.data.err);
      }
    });
  };

  return (
    <div>
      <br />
      <p> reviews</p>
      <hr />
      {/* Comment Lists  */}

      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
<<<<<<< HEAD
=======
                  writer={user.userData ? user.userData._id : ''}
>>>>>>> 71548319366157399a1665e4f1770302e440e692
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}
<<<<<<< HEAD

=======
      {props.CommentLists.length==0 &&
        <p>리뷰가 없습니다.</p>
      }
      <p>review this book</p>
      <hr />
>>>>>>> 71548319366157399a1665e4f1770302e440e692
      {/* Root Comment Form */}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmit}
      >
<<<<<<< HEAD
        review this book
        <hr />
=======
>>>>>>> 71548319366157399a1665e4f1770302e440e692
        <StarRatings
          rating={Rating}
          starRatedColor="red"
          changeRating={changeRating}
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="10px"
        />
<<<<<<< HEAD
=======
        <br />
>>>>>>> 71548319366157399a1665e4f1770302e440e692
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={Comment}
          placeholder="리뷰를 작성해주세요"
        />
        <br />
        <Button style={{ width: "30%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comments;
