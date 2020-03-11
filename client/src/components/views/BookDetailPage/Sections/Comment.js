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
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}
      {/* Root Comment Form */}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmit}
      >
        review this book
        <hr />
        <StarRatings
          rating={Rating}
          starRatedColor="red"
          changeRating={changeRating}
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="10px"
        />
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
