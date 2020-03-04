import React from 'react';
import { Menu } from 'antd';
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">홈</a>
    </Menu.Item>
    <Menu.Item key="subscription">
      <a href="/subscription">내 구독</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu