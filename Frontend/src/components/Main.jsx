import React from 'react';
import "antd/dist/antd.css";
import GlobalStyle from '../css/global';
import MenuApp from './Menu'
import Conteudo from './Conteudo'

// import './css/global.css'
import { Layout, Row } from 'antd';

const { Content } = Layout;


function App() {
  return (
    <div className=" App">
      <MenuApp title="mega hack totalVoice"></MenuApp>
      <Layout>
        {/* <Header className="box"> */}
        {/* </Header> */}
        <br></br>
        <Row>
          <Content>
            <div className="container">
            <Conteudo></Conteudo>
            </div>
          </Content>
        </Row>
      </Layout>
    </div>
  );
}

export default App;
