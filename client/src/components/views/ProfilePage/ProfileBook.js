import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout, Menu, List } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import Axios from "axios";
import { Row } from "antd";
import { BACK_SERVER_URL } from '../../Config.js';
const { Content, Sider } = Layout;

function ProfileBookPage() {
  const user = useSelector(state => state.user);
  const [Collapse, setCollapse] = useState(false);
  const [books, setbooks] = useState([]);

  useEffect(() => {
    const variables = {
      _id: localStorage.getItem("userId")
    };
    Axios.post(`${BACK_SERVER_URL}/api/users/profilebook`,variables).then(response => {
      if (response.data.success) {
        setbooks(response.data.profilebooks);
        // console.log('/api/book/getbooks',response.data.books[0])
      } else {
        alert("책 가져오기를 실패 했습니다.");
      }
    });
  }, []);

  const renderCards = books.map((book, index) => {
    return (
      <Row lg={4} md={8} xs={12} style={{ maxHeight: "300px" }} key={index}>
      <List>
        <List.Item>
          <img
            src={`${book.filePath}`}
            style={{
              width: "60px",
              height: "90px",
              marginRight: "10px"
            }}
            alt="DetailImg"
          />
          <a href={`/book/${book._id}`}>{book.title} </a>, {book.author}{" "}
          {book.year}
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
          <Menu theme="white" defaultSelectedKeys={["profile_book"]} mode="inline">
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

export default ProfileBookPage;
