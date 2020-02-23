import React, {useEffect, useState} from 'react'
import {FaCode} from "react-icons/fa";
import {
    Card,
    Icon,
    Avatar,
    Col,
    Typography,
    Row
} from 'antd';
import Axios from 'axios';
import moment, { min } from 'moment';
const {Title} = Typography
const {Meta} = Card;

function LandingPage() {
    const [books, setbooks] = useState([])
    const [FilePath, setFilePath] = useState([""])
    useEffect(() => {
        Axios
            .get('/api/book/getbooks')
            .then(response => {
                if (response.data.success) {
                    setbooks(response.data.books)
                    setFilePath(response.data.books[0].filePath)

                } else {
                    alert('책 가져오기를 실패 했습니다.')
                }
            })
    }, [])

    const renderCards = books.map((book, index) => {
        return  <Col lg={6} md={8} xs={24}>
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
                    src={`http://localhost:5000/${FilePath}`}/>
                <div
                    className=" duration"
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
                Recommended</Title>
            <hr/>
            <Row gutter={[32, 16]}>
                {renderCards}
               
            </Row>

        </div>
    )
}

export default LandingPage
