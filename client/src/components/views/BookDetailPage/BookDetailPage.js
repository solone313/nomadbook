import React, {useState, useEffect} from "react";
import {
    Row,
    Col,
    Tabs,
    Spin,
    Typography
} from "antd";
import Axios from "axios";
import SideBook from "./Sections/SideBook";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";
import StarRatings from "react-star-ratings";
import './BookDetailPage.css'

function BookDetailPage(props) {
    const bookId = props.match.params.bookId;
    const variable = {
        bookId: bookId
    };
    const [BookDetail, setBookDetail] = useState([]);
    const [CommentLists, setCommentLists] = useState([]);
    const [BookScore, setBookScore] = useState(0);
    const [BookCount, setBookCount] = useState(0);
    const {Paragraph} = Typography;
    const {TabPane} = Tabs;
    function callback(key) {
        console.log(key);
    }
    useEffect(() => {
        Axios
            .post("/api/book/getBookDetail", variable)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data.book)
                    setBookDetail(response.data.book);
                } else {
                    alert("북 정보를 가져오기를 실패했습니다.");
                }
            });
        Axios
            .post("/api/comment/getComments", variable)
            .then(response => {
                if (response.data.success) {
                    // console.log('response.data.comments',response.data.comments)
                    setCommentLists(response.data.comments);
                } else {
                    alert("코멘트 정보를 가져오는 것을 실패했습니다.");
                }
            });
        Axios
            .post("/api/comment/getBookscore", variable)
            .then(response => {
                if (response.data.success) {
                    // console.log('response.data.rating',response.data.rating,
                    // typeof(response.data.rating))
                    setBookScore(parseFloat(response.data.rating));
                    setBookCount(response.data.count);
                } else {
                    alert("코멘트 정보를 가져오는 것을 실패했습니다.");
                }
            });
    }, []);
    const updateComment = newComment => {
        setCommentLists(CommentLists.concat(newComment));
        Axios
            .post("/api/comment/getBookscore", variable)
            .then(response => {
                if (response.data.success) {
                    // console.log('response.data.rating',response.data.rating,
                    // typeof(response.data.rating))
                    setBookScore(parseFloat(response.data.rating));
                    setBookCount(response.data.count);
                } else {
                    alert("코멘트 정보를 가져오는 것을 실패했습니다.");
                }
            });
    };
    if (BookDetail.writer) {
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <div
                            style={{
                                textAlign: "center",
                                float: "left",
                                marginLeft:"10px",
                            }}>
                            <div>
                                <img
                                    src={`${BookDetail.filePath}`}
                                    style={{
                                        padding: "50px 20px 20px",
                                        position: "relative",
                                        width:"240px",
                                        height:"365px"
                                    }}
                                    alt="DetailImg"/>
                            </div>
                                <h3 className="Detail_star">
                                    {" "}
                                    {
                                        BookCount === undefined
                                            ? "첫 리뷰를 등록해주세요"
                                            : `리뷰 수: ${BookCount}`
                                    }
                                </h3>
                                <StarRatings
                                    rating={BookScore}
                                    starRatedColor="#F7D358"
                                    starDimension="25px"
                                    starSpacing="1px"
                                    />{" "}
                                <br/>
                                <div>
                                    <Subscribe userTo={BookDetail._id} userFrom={localStorage.getItem("userId")}/>
                                </div>
                        </div>

                        <div
                            style={{
                                padding: "50px 20px 0",
                                maxWidth: "100%",
                                display: "inline-block",
                                width:"800px"
                            }}>
                            <div
                                className="Detail__container"
                                style={{
                                    width: "100%"
                                }}>
                                <h2 className="Detail_title">
                                    {BookDetail.title}
                                </h2>
                                <h3 className="Detail_detail">상세정보</h3>
                                <hr/>
                                <h3 className="Detail_description">
                                    {" "}
                                    {BookDetail.year + "," + BookDetail.author}{" "}
                                </h3>
                                <h3 className="Detail_description">
                                    {" "}
                                    {BookDetail.publisher}{" "}
                                </h3>
                                <div
                                style={{
                                    maxWidth: "100%",
                                    marginTop:"20px"
                                }}>
                                <Tabs onChange={callback} type="card">
                                    <TabPane tab="책소개" key="1">     
                                        <Paragraph
                                            ellipsis={{
                                                rows: 6,
                                                expandable: true
                                            }}>
                                            {BookDetail.description}
                                        </Paragraph>   
                                    </TabPane>
                                </Tabs>
                            </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                {/* <Row gutter={[16, 16]}>
                    <div >
                        <SideBook/>
                    </div>
                </Row> */}
                <Row gutter={[16, 16]}>
                    <div style={{marginLeft:"40px", width:"92%"}}>
                            <Comment
                                CommentLists={CommentLists}
                                postId={bookId}
                                refreshFunction={updateComment}/>      
                    </div>
                </Row>
                <Row gutter={[16, 16]}>
                    <div style={{marginLeft:"40px", width:"92%",marginBottom:"40px"}}>
                        <Comment
                            CommentLists={CommentLists}
                            postId={bookId}
                            refreshFunction={updateComment}/>      
                    </div>                          
                </Row>

            </div>
        );
    } else {
        return <div>
            <Spin style={{paddingRight:"47%",paddingLeft:"47%",marginTop:"200px"}} size="large" />
            </div>;
    }
}
export default BookDetailPage;
