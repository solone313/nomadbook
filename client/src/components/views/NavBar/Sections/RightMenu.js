/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from '../../../../_actions/user_actions';

function RightMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const logoutHandler = () => {

    dispatch(logoutUser())
      .then(response => {
        if (response.payload.success) {
          window.location.reload();
        } else {
          alert('Failed to log out')
        }
      })
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode} style={{ padding: "0 20px",
      backgroundColor:" rgba( 255, 255, 0.0, 0.0 )"}}>
        <Menu.Item key="mail" >
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">회원가입</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode} style={{ padding: "0 20px",
      backgroundColor:" rgba( 255, 255, 0.0, 0.0 )"}}>
        <Menu.Item key="app" >
          <a href="/book/upload">책 업로드</a>
        </Menu.Item>
        <Menu.Item key="profile">
          <a href="/profile">내 정보</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
