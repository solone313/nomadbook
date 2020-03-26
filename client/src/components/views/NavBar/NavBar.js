import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button, Icon, Input, Col } from "antd";
import "./Sections/style.css";

const { Search } = Input;

function NavBar(props) {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  function onSearch(value) {
    if(value.replace(/ /gi, "")===""){ 
      alert("검색을 입력해주세요."); return false; 
    }
    let path = `/search?value=${value}`;
    props.history.push(path);
    window.location.reload(false);
   
  }
  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 5, width: "100%" }}
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
          <div className="menu_searchbox">
            <Search
              className="search-b"
              placeholder="책검색"
              onSearch={value => onSearch(value)}
              style={{ width: "500px",display: "table-cell",height:"40px" }}
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
              className="search-b"
              placeholder="책검색"
              onSearch={value => onSearch(value)}
              style={{ width: "500px",display: "table-cell",height:"40px" }}
            />
            <LeftMenu mode="inline" />
            <RightMenu mode="inline" />
          </Drawer>
        </div>
      </Col>
      <Col lg={3} xs={24}></Col>
    </nav>
  );
}

export default withRouter(NavBar);
