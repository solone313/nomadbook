import React, {useState, useEffect } from 'react'
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideBook from './Sections/SideBook';
import Subscribe from './Sections/Subscribe';
import Comments from './Sections/Comments';

function BookDetailPage(props) {
    const bookId = props.match.params.bookId
    const variable = { bookId: bookId }
    const [BookDetail, setBookDetail] = useState([])
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
    }, [])

    if(BookDetail.writer) {
        return(
        <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
            <div style={{ width: '100%', padding:'3rem 4rem'}}>
                <div>
                    <img src={`${BookDetail.filePath}`} style={{width: '100%' }}/>
                </div>
                <List.Item
                    actions={[<Subscribe userTo={BookDetail.writer._id} userFrom={localStorage.getItem('userId')} />]}>
                        <List.Item.Meta
                            avatar={ <Avatar src={BookDetail.writer.image} />}
                            title={ BookDetail.writer.name }
                            description={ BookDetail.description }
                            />
                </List.Item>
                <Comments />
            </div>
        </Col>
        <Col lg={6} xs={24}>
            <SideBook />
        </Col>
    </Row>
    )
    } else{
        return (
            <div>...Loding</div>
        )
    }
   
}
export default BookDetailPage