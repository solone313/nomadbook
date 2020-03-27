import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import StarRatings from "react-star-ratings";
import '../BookDetailPage.css'

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

    if(Comment.replace(/ /gi, "")===""||Comment.replace( /\n/gi, "")===""){ alert("리뷰를 입력해주세요."); return false; }
    
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
      <div>리뷰</div>
      {/* Comment Lists  */}
      <hr  />
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
      {props.CommentLists.length===0 &&
        <p>리뷰가 없습니다.</p>
      }
       <p> review this book </p>
        <hr />
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onSubmit}
        >
        <StarRatings
          rating={Rating}
          starRatedColor="red"
          changeRating={changeRating}
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="3.5px"
        />
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={Comment}
          placeholder="리뷰를 작성해주세요"        
        />
        <br />
        <Button style={{marginBottom: "40px", width: "30%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comments;
