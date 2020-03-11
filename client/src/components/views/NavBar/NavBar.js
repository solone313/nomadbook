import React, { useState } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button, Icon, Input } from "antd";
import "./Sections/style.css";

const { Search } = Input;

function NavBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 5, width: "100%" }}
    >
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
        <div className="menu_searchbox">
          <Search
            placeholder="input search text"
            onSearch={value => alert("개발중입니다 검색: " + value)}
            style={{ width: 200 }}
          />
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
          <Search
            placeholder="input search text"
            onSearch={value => alert("개발중입니다 검색: " + value)}
            style={{ width: "100%" }}
          />
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;
