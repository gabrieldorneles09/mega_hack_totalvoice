import React from 'react'
import '../css/global.css'
import '../css/content.css'

import { Layout, Row, Col, Menu, Typography, Input } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
export default props =>
<Row>
    <Col span={12} offset={7}>
      <Search
        size="large"
        placeholder="Digite seu CEP"
        onSearch={value => value }
        style={{ width: 500 }}
        maxLength={9}
        loading={0}
      />
    </Col>
</Row>