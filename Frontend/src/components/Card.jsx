import React, { useState, useEffect } from "react";

import "../css/global.css";
import "../css/content.css";
import { Typography, Input, Modal, Button } from "antd";
import { OmitProps } from "antd/lib/transfer/renderListBody";

// const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const Card = props =>

  
    <>
    <div >
      <div class="card text-center margBot">
        <div class="card-header">
          <h2>{props.title}</h2>
      </div>
        <div class="card-body">
          <p>{props.description}</p>
        </div>
        {/* onClick={} */}
        <div class="card-footer text-muted">
          <button className="btn btn-success" >Ver mais</button>
        </div>
      </div> 
    </div>
    <div>
      <Button type="primary" onClick={this.showModal}>
        Open Modal
        </Button>
      <Modal
        title="Basic Modal"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
    </>
  export default Card