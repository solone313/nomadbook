import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout, Menu, List, Button } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import Axios from "axios";
import { Row } from "antd";
import { BACK_SERVER_URL } from '../../Config.js';
import axios from 'axios';
const { Content, Sider } = Layout;

function ProfilePage() {
  const user = useSelector(state => state.user);
  const [Collapse, setCollapse] = useState(true);
  const [reviews, setreviews] = useState([]);
  useEffect(() => {
    const variables = {
      _id: localStorage.getItem("userId")
    };
    Axios.post(`${BACK_SERVER_URL}/api/users/profilecomment`,variables).then(response => {
      if (response.data.success) {
        setreviews(response.data.profilecomments);
        // console.log('/api/book/getbooks',response.data.books[0])
      } else {
        alert("책 가져오기를 실패 했습니다.");
      }
    });
  }, []);


  const onSubmit = e => {
    e.preventDefault();

    const variables = {
      postId: e.target.value,
      userId: localStorage.getItem("userId")
    };
    // console.log(variables, e.target);
    axios.post(`${BACK_SERVER_URL}/api/comment/deleteComment`, variables).then(response => {
      if (response.data.success) {
        console.log("Qwe")
        setreviews(response.data.profilecomments);
      } else {
        alert("코멘트 저장에 실패했습니다 이유: " + response.data.err);
      }
    });
  };


  const renderCards = reviews.map((review, index) => {
    return (
      <Row lg={4} md={8} xs={12} style={{ maxHeight: "300px" }} key={index}>
        <List>
          <List.Item>
            <img
              src={`${review.postId.filePath}`}
              style={{
                width: "80px",
                height: "110px",
                marginRight: "10px"
              }}
              alt="DetailImg"
            />{" "}
            <a href={`/book/${review.postId._id}`}>{review.postId.title} </a>,{" "}
            {review.content} {review.rating}&emsp;
            <Button type="primary" onClick={onSubmit} value={review._id}>
              삭제
            </Button>
          </List.Item>
        </List>
        {/* <br />
        <span>평점: {book.rating}</span> */}
      </Row>
    );
  });
  const onCollapse = collapsed => {
    // console.log(collapsed);
    setCollapse(collapsed);
  };
  if (user.userData) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          style={{ background: "#fff" }}
          collapsible
          collapsed={Collapse}
          onCollapse={onCollapse}
        >
          <div className="logo" />
          <Menu theme="white" defaultSelectedKeys={["profile_review"]} mode="inline">
            <Menu.Item key="profile_review">
              <a href='/profile'>
              <UserOutlined />
              <span>내 리뷰</span>
              </a>
            </Menu.Item>
            <Menu.Item key="profile_book">
              <a href='/profilebook'>
              <UploadOutlined />
              <span>내가 올린 책들</span>
              </a>
            </Menu.Item>
            <Menu.Item key="profile_delete">
              <a href='/delete'>
              <UserOutlined />
              <span>회원 탈퇴</span>
              </a>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div>user/ {user.userData.name} </div>
              {renderCards}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  } else {
    return <div>Loading....</div>;
  }
}

export default ProfilePage;
