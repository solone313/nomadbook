import React from 'react';
import {Comment, Avatar} from 'antd';



function SingleComment(props) {
    
    return (
        <div>
        <Comment
            author={props.comment.writer.name}
            avatar={
                <Avatar
                    src={props.comment.writer.image}
                    alt="image"
                />
            }
            content={<div><h3>{props.comment.rating}개의 별점 부여</h3><p>{props.comment.content}</p></div>}
        ></Comment>

    </div>
    )
}

export default SingleComment
