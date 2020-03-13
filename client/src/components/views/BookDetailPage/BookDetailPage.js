import React, {useState, useEffect} from "react";
import {
    Row,
    Col,
    Tabs,
    Dropdown,
    Button,
    Menu,
    Rate,
    message,
    Typography
} from "antd";
import {DownOutlined, UserOutlined} from '@ant-design/icons';
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
    function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    }
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">
                <UserOutlined/>
                1st menu item
            </Menu.Item>
            <Menu.Item key="2">
                <UserOutlined/>
                2nd menu item
            </Menu.Item>
            <Menu.Item key="3">
                <UserOutlined/>
                3rd item
            </Menu.Item>
        </Menu>
    );
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
                } else {
                    alert("코멘트 정보를 가져오는 것을 실패했습니다.");
                }
            });
    };
    if (BookDetail.writer) {
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <div
                            style={{
                                textAlign: "center",
                                float: "left"
                            }}>
                            <div
                                style={{
                                    height: "400px"
                                }}>
                                <img
                                    src={`${BookDetail.filePath}`}
                                    style={{
                                        padding: "50px 20px",
                                        position: "relative"
                                    }}
                                    alt="DetailImg"/>
                            </div>
                        </div>

                        <div
                            style={{
                                padding: "50px 20px 0",
                                maxWidth: "100%",
                                display: "inline-block"
                            }}>
                            <div
                                className="Detail__container"
                                style={{
                                    width: "100%"
                                }}>
                                <h2 className="Detail_title">
                                    {BookDetail.title}
                                </h2>
                                <hr/>
                                <h3 className="Detail_detail">상세정보</h3>
                                <h3 className="Detail_description">
                                    {" "}
                                    {BookDetail.year + "," + BookDetail.author}{" "}
                                </h3>
                                <h3 className="Detail_description">
                                    {" "}
                                    {BookDetail.publisher}{" "}
                                </h3>
                                <h3 className="Detail_star">
                                    {" "}
                                    {
                                        BookCount === undefined
                                            ? "첫 리뷰를 등록해주세요"
                                            : `리뷰 수: ${BookCount}`
                                    }
                                </h3>
                                <Rate
                                  rating={BookScore}
                                  starRatedColor="blue"
                                  starDimension="25px"
                                  starSpacing="1px" />
                                &nbsp; {
                                    BookScore === 0
                                        ? "리뷰 X"
                                        : `${BookScore}`
                                }
                                <br/>
                                <hr/>
                                <div
                                    style={{
                                        marginTop: "15px",
                                        fontSize: "25px"
                                    }}>
                                    <Button>
                                        <a href="https://github.com/ant-design/ant-design/issues/1862">카카오톡</a>
                                    </Button>
                                    <Dropdown overlay={menu}>
                                        <Button>
                                            온라인 상점
                                            <DownOutlined/>
                                        </Button>
                                    </Dropdown>
                                    <Button>
                                        <a href="https://github.com/ant-design/ant-design/issues/1862">페이스북</a>
                                    </Button>
                                    <Button>
                                        <a href="https://github.com/ant-design/ant-design/issues/1862">인스타그램</a>
                                    </Button>
                                </div>
                                <br/>
                                <div >
                                    <Subscribe userTo={BookDetail._id} userFrom={localStorage.getItem("userId")}/>
                                </div>
                            </div>
                            <br/>
                        </div>
                        {/* <div style={{height:"100%", display:"flex",float:"right",width:"auto"}}>
                          <SideBook/>
                        </div> */}
                        <Col lg={24} xs={24}>
                            <div
                                style={{
                                    maxWidth: "100%",
                                    marginTop: "50px"
                                }}>
                                <Tabs onChange={callback} type="card">
                                    <TabPane tab="책소개" key="1">
                                        <h1>책소개</h1>
                                        <hr/>
                                        <div>
                                            <Paragraph
                                                ellipsis={{
                                                    rows: 6,
                                                    expandable: true
                                                }}>
                                                {BookDetail.description}
                                            </Paragraph>
                                            <Comment
                                                CommentLists={CommentLists}
                                                postId={bookId}
                                                refreshFunction={updateComment}/>
                                        </div>

                                    </TabPane>
                                    <TabPane tab="댓글" key="2">
                                        <Comment
                                            CommentLists={CommentLists}
                                            postId={bookId}
                                            refreshFunction={updateComment}/>
                                    </TabPane>
                                    <TabPane tab="저자 및 역자소개" key="3">
                                        Content of Tab Pane 3
                                    </TabPane>
                                    <TabPane tab="출판사 소개" key="4">
                                        Content of Tab Pane 4
                                    </TabPane>
                                </Tabs>
                            </div>
                        </Col>
                        {/* <Col lg={24} xs={24}>
                            <SideBook/>
                        </Col> */}

                    </Col>

                    <Col span={3}></Col>
                </Row>

            </div>
        );
    } else {
        return <div>...Loding</div>;
    }
}
export default BookDetailPage;