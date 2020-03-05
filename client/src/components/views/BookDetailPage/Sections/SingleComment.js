import React, { useState } from 'react';
import {Comment, Avatar, Button, Input} from 'antd';
import Axios from 'axios';
import {useSelector} from 'react-redux';

const {TextArea} =Input;

function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")
    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply) 
    }
    const onhandleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }
    const onSubmit =(event) => {
        event.preventDefault();
        const variables={
            content: CommentValue,
            writer: user.userData._id,
            postI: props.postId,
            responseTo: props.comment._id
        }
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success){
                    setCommentValue("")
                    props.refreshFunction(response.data.result)
                }else{
                    alert('코멘트를 저장하지 못했습니다.')
                }
            })
    }
    const actions = [
       
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to </span>
    ]
    return (
        <div>
        <Comment
            actions={actions}
            author={props.comment.writer.name}
            avatar={
                <Avatar
                    src={props.comment.writer.image}
                    alt="image"
                />
            }
            content={<p><h3>{props.comment.rating}개의 별점 부여</h3>{props.comment.content}</p>}
        ></Comment>


        {OpenReply &&
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={onhandleChange}
                    value={CommentValue}
                    placeholder="코멘트를 작성해주세요"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
        }

    </div>
    )
}

export default SingleComment
