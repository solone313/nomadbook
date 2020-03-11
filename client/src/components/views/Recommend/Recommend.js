import React from 'react';
import  {useEffect, useState} from 'react'
import {
    Card,
    Avatar,
    Col,
    Typography,
    Row
} from 'antd';
import Axios from 'axios';
import moment from 'moment';
const {Title} = Typography;
const {Meta} = Card;
function SubscriptionPage() {
    const [books, setbooks] = useState([])
    useEffect(() => {
        const SubscriptionVariables ={
            userFrom : localStorage.getItem('userId')
        }
        Axios
            .get('/api/book/recommend',SubscriptionVariables )
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.books);
                    setbooks(response.data.books)
                    // console.log('/api/book/getbooks',response.data.books[0])
                } else {
                    alert('책 가져오기를 실패 했습니다.')
                }
            })
    }, [])
    const renderCards = books.map((book, index) => {
        return  <Col lg={6} md={8} xs={24} key={book._id}>
        <div
            style={{
                position: 'relative'
            }}>
            <a href={`/book/${book._id}`}>
                <img
                    style={{
                        width: '100%'
                    }}
                    alt="thumbnail"
                    src={`${book.filePath}`} crossOrigin="anonymous"/>
                    {/* src={`http://localhost:5000/${book.filePath}`}/> */}
                <div
                    className="duration"
                    style={{
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        margin: '4px',
                        color: '#fff',
                        backgroundColor: 'rgba(17, 17, 17, 0.8)',
                        opacity: 0.8,
                        padding: '2px 4px',
                        borderRadius: '2px',
                        letterSpacing: '0.5px',
                        fontSize: '12px',
                        fontWeight: '500',
                        lineHeight: '12px'
                    }}>
                   
                </div>
            </a>
        </div><br/>
        <Meta
            avatar={<Avatar src = {
                book.writer.image
            } />
}
            title={book.title}/>
        <span>{book.writer.name}
        </span><br/>
        <span
            style={{
                marginLeft: '3rem'
            }}>
            {book.views}</span>
        -
        <span>
            {moment(book.createdAt).format("MMM Do YY")}
        </span>
    </Col>
    });

    return (
        <div
            style={{
                width: '85%',
                margin: '3rem auto'
            }}>
            <Title level={2}>
                Books</Title>
            <hr/>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>

        </div>
    )
}

export default SubscriptionPage
