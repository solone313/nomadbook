import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined, UploadOutlined, CloudOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;

function ProfilePage() {
  const user = useSelector(state => state.user);
  const [Collapse, setCollapse] = useState(false);

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
          <Menu theme="white" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="profile_review">
              <UserOutlined />
              <span>내 리뷰</span>
            </Menu.Item>
            <Menu.Item key="profile_book">
              <UploadOutlined />
              <span>내가 올린 책들</span>
            </Menu.Item>
            <Menu.Item key="profile_update">
              <CloudOutlined />
              <span>정보 수정</span>
            </Menu.Item>
            <Menu.Item key="profile_delete">
              <UserOutlined />
              <span>회원 탈퇴</span>
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
              개발중입니다.
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
