import React from 'react'
import '../css/global.css'
import { Layout, Row, Col, Menu, Typography } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;
export default props =>
  

  <Menu mode="horizontal" className="box">
      <Title>{props.title}</Title>
  </Menu>

  