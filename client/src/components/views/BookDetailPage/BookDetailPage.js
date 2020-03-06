import React, {useState, useEffect } from 'react'
import { Row, Col, List } from 'antd';
import Axios from 'axios';
import SideBook from './Sections/SideBook';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function BookDetailPage(props) {
    const bookId = props.match.params.bookId
    const variable = { bookId: bookId }
    const [BookDetail, setBookDetail] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    
    useEffect(() => {
        Axios.post('/api/book/getBookDetail', variable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.book)
                    setBookDetail(response.data.book)
                }else {
                    alert('북 정보를 가져오기를 실패했습니다.')
                }
            })
        Axios.post('/api/comment/getComments', variable)
            .then(response => {
                if(response.data.success){
                    console.log('response.data.comments',response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('코멘트 정보를 가져오는 것을 실패했습니다.')
                }
            })
    }, [])
    const updateComment  = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }
    if(BookDetail.writer) {
        return(
        <div>
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <div style={{ width: '100%', padding:'3rem 4rem'}}>
                    <img src={`${BookDetail.filePath}`} style={{width: '40%', float: 'left' }} alt="DetailImg"/>
                    <div style={{width:'50%', float:'right'}}>
                        <List.Item>
                            <List.Item.Meta
                                title= {BookDetail.title}
                                description={ BookDetail.year + ',' +BookDetail.author + '  ' + BookDetail.publisher }
                            />
                        </List.Item>
                        <Subscribe userTo={BookDetail._id} userFrom={localStorage.getItem('userId')} />
                    </div>
                </div>
            </Col>
            <Col lg={6} xs={24}>
                <SideBook />
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <div style={{ width: '100%', padding:'3rem 4rem'}}>
                    <List.Item>
                            <List.Item.Meta
                                title= '책소개'
                                description={ BookDetail.description }
                            />
                    </List.Item>
                    <Comment CommentLists={CommentLists} postId={bookId} refreshFunction={updateComment} />
                </div>
            </Col>
        </Row>        
        </div>
    )
    } else{
        return (
            <div>...Loding</div>
        )
    }
   
}
export default BookDetailPage