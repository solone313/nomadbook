import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function SideBook() {
    const [SideBook, setSideBook] = useState([])
    useEffect(() => {
        Axios
            .get('/api/book/getbooks')
            .then(response => {
                if (response.data.success) {
                    setSideBook(response.data.books)
                } else {
                    alert('책 가져오기를 실패 했습니다.')
                }
            })
    }, [])

    const renderSideBook = SideBook.map((book, index) => {
        return <div key={book._id} style={{ display:'flex', marginBottom:'1rem', padding: '0 2rem'}}>
        <div style={{width: '20%', marginRight: '1rem'}}>
            <a href="#">
                <img style={{width:'100%', height:'100%'}} src={`${book.filePath}`}  alt="thumbnail"/>
            </a>
        </div>
        <div style={{width:'20%'}}>
            <a href="#" style={{color:'gray'}}>
                <span style={{ fontSize:'1rem', color:'black'}}>{book.Title}</span>
                <span>{book.title}</span>
            </a>
        </div>
    </div>
    })

    return (
        <React.Fragment>
            <div style={{marginTop: '3rem'}}>
                {renderSideBook}
            </div>
        </React.Fragment>
        
    )
}

export default SideBook
