import React from "react";
import { Row, Col } from "antd";
function Footer() {
  return (
    <footer id="footer" className="dark">
      <div className="footer-wrap">
        <Row>
          <Col lg={12} sm={24} xs={24}>
            <div className="footer-center">
              <h2>With Ant Design</h2>
              <div>
                <a
                  target="_blank "
                  href="https://github.com/solone313/nomadbook"
                >
                  GitHub - This repo
                </a>
              </div>
              <br />
              <br />
            </div>
          </Col>
          <Col lg={12} sm={24} xs={24}>
            <div className="footer-center">
              <h2>
                <img
                  className="title-icon"
                  src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
                  alt=""
                />
                Contact
              </h2>
              <div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.rocketpunch.com/@wjstk1233"
                >
                  Rocketpunch
                </a>
                <span> - </span>
                류호진
              </div>
              <div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.naver.com/"
                >
                  EMAIL
                </a>
                <span> - </span>
                solone313@naver.com
              </div>
              <div>
                <a target="_blank " href="https://github.com/solone313">
                  GitHub
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="bottom-bar">
        <Col lg={4} sm={24} />
        <Col lg={20} sm={24}>
          <span style={{ marginRight: 12, fontSize: "14px" }}>
            개발: 강은현,류호진
          </span>
          <br />
          <span style={{ marginRight: 12 }}>Copyright © GOREADS</span>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
