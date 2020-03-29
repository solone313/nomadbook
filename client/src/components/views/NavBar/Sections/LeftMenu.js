import React from "react";
import { Menu } from "antd";
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode} style={{ padding: "0 20px",
      backgroundColor:" rgba( 255, 255, 0.0, 0.0 )"}}>
<<<<<<< HEAD
      <Menu.Item key="introduce"zz>
=======
      <Menu.Item key="introduce">
>>>>>>> 3a2672f95ccc031e741eca3839d7af8c0fab4bc0
        <a
          href="https://github.com/solone313/nomadbook"
          rel="noopener noreferrer"
          target="_blank"
        >
          소개
        </a>
      </Menu.Item>
      <Menu.Item key="subscription">
        <a href="/subscription">내 구독</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
