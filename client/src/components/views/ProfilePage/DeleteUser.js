import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Layout, Menu, Breadcrumb , message, Button} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { BACK_SERVER_URL } from '../../Config.js';
const { Content, Sider } = Layout;

function DeleteUserPage(props) {
  const user = useSelector(state => state.user);
  const [Collapse, setCollapse] = useState(true);

  const onCollapse = collapsed => {
    // console.log(collapsed);
    setCollapse(collapsed);
  };
  const onSubmit = event => {
    event.preventDefault();
    //    console.log(event)
    const variables = {
      _id : localStorage.getItem("userId")
    };
    axios.post(`${BACK_SERVER_URL}/api/users/deleteuser`, variables).then(response => {
      if (response.data.success) {
        message.success("회원탈퇴에 성공했습니다");
        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      } else {
        alert("Failed to Delete");
      }
    });
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
          <Menu theme="white" defaultSelectedKeys={["profile_delete"]} mode="inline">
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
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>{user.userData.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <h1>정말 탈퇴하시겠습니까?</h1><h3>- 업로드한 책과 리뷰 모두 삭제됩니다.</h3>
             <Button type="primary" size="large" onClick={onSubmit}>
              탈퇴하기
            </Button>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  } else {
    return <div>Loading....</div>;
  }
}

export default DeleteUserPage;
