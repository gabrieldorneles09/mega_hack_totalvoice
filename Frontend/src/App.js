import React from 'react';
import "antd/dist/antd.css";
import GlobalStyle from './css/global';
import MenuApp from './components/Menu'
import Conteudo from './components/Content'

// import './css/global.css'
import { Layout, Row, Col, Menu } from 'antd';

const { Header, Footer, Sider, Content } = Layout;


function App() {
  return (
    <div className="App">
        <MenuApp title="mega hack totalVoice"></MenuApp>
      <Layout>
      {/* <Header className="box"> */}
      {/* </Header> */}
      <br></br>
      <Row>
        <Content>
          <Conteudo></Conteudo>
        </Content>
      </Row>
      </Layout>
    </div>
  );
}

export default App;
