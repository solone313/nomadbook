import React, {useEffect, useState} from 'react'
import {
    Card,
    Col,
    Typography,
    Row
} from 'antd';
import Axios from 'axios';
const {Title} = Typography
const {Meta} = Card;

function LandingPage() {
    const [books, setbooks] = useState([])
    useEffect(() => {
        Axios
            .get('/api/book/getbooks')
            .then(response => {
                if (response.data.success) {
                    setbooks(response.data.books)
                    // console.log('/api/book/getbooks',response.data.books[0])
                } else {
                    alert('책 가져오기를 실패 했습니다.')
                }
            })
    }, [])

    const renderCards = books.map((book, index) => {
        return  <Col lg={4} md={8} xs={24} key={book._id}>
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
        <Meta title={book.title} />
        <span>
          {book.author}, {book.publisher}
        </span>
        <br />
        <span>평점: {book.rating}</span>
    </Col>
    });

    return (
        <div
            style={{
                width: '85%',
                margin: '3rem auto'
            }}>
            <Title level={2}>
                최근 올라온 책</Title>
            <hr/>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>

        </div>
    )
}

export default LandingPage
