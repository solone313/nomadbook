import React, { useState } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button, Icon, Col } from "antd";
import { useLocation } from 'react-router-dom'
import "./Sections/style.css";


function NavBar() {
  const [visible, setVisible] = useState(false);
  let location = useLocation();
  let navColor = location.pathname === '/' ? "rgba( 255, 255, 0.0, 0.0 )" : "#fff";
  let navBorder = location.pathname === '/' ? "rgba( 255, 255, 0.0, 0.0 )" : "solid 1px #e8e8e8";

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav
      className="menu"
      style={{borderBottom: navBorder,padding: "0 20px", backgroundColor: navColor , position: "fixed", zIndex: 5, width: "100%" }}
    >
      <Col lg={3} xs={24}></Col>
      <Col lg={18} xs={24}>
        <div className="menu__logo">
          <a href="/">
            <img
              src="https://goreads.s3.ap-northeast-2.amazonaws.com/goreads.png"
              height="55"
              width="120"
              alt="mainImg"
            />
          </a>
        </div>

        <div className="menu__container">
          <div className="menu_left">
            <LeftMenu mode="horizontal" />
          </div>
          <div className="menu_rigth">
            <RightMenu mode="horizontal" />
          </div>
          <Button
            className="menu__mobile-button"
            type="primary"
            onClick={showDrawer}
          >
            <Icon type="align-right" />
          </Button>
          <Drawer
            title="메뉴"
            placement="right"
            className="menu_drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <LeftMenu mode="inline" />
            <RightMenu mode="inline" />
          </Drawer>
        </div>
      </Col>
      <Col lg={3} xs={24}></Col>
    </nav>
  );
}

export default NavBar;
