import React, { useState, useEffect } from "react";

import "../css/global.css";
import "../css/content.css";

// import Card from './Card'

// import InputMask from 'react-input-mask';
import axios from 'axios'
import { Typography, Input, Modal, Button } from "antd";

// const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

export default function Conteudo() {
  //state cria assim
  const [load, setLoad] = useState(0);
  const [data, setData] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [responseInsertData, setResponseInsertData] = useState();
  const [responseSearch, setResponseSearch] = useState();

  function search(value) {
    //  console.log(value);

    //atualiza o state do load
    setData(value);
    setLoad(1);
    // console.log("search:",value, load);
  }

  useEffect(() => {
    async function fetchData() {
      if (load != 0) {
        const url = ""
        const response = axios.post(url,"{data: dfdf}").then(response =>{
          setResponseSearch(response)
          console.log(responseSearch)
        }).catch(error =>{
          console.log(error)
        })
        const dados = await response.data
        console.table(dados);
        setRepositories(dados);
        setLoad(0);
      }
    }
    fetchData();
  }, [load]);

  function handleOk(e)  {
    console.log(e);
    let form = document.getElementById("form").serialize()
    const urlInsertData = '';
    axios.post(urlInsertData,form).then(response =>{
        setResponseInsertData(response)
        console.log(responseInsertData)
      }).catch(error => {
        console.log(error)
      })
    setVisible(false)
  };

  function showModal() {

       setVisible(true)

  };


  function handleCancel(e) {
    console.log(e);
    setVisible(false)
  };

return (
  <>
      <div className="row margTop">
        
        <div className="col-md-12 col-xs-12 offset-md-3">
          <Search
            size="large"
            placeholder="Digite seu CEP"
            onSearch={value => search(value)}
            style={{ width: 500 }}
            maxLength={9}
            loading={load}
          />
        </div>
      </div>
      <div className="row margTop">
        {repositories.map(repo => (
          <div className="col-md-4 col-xs-12 margBot">
            <div class="card text-center">
              <div class="card-header">
                <h2>{repo.name}</h2>
              </div>
              <div class="card-body">
                <p>{repo.description}</p>
              </div>
              {/* onClick={} */}
              <div class="card-footer text-muted">
                <button className="btn btn-success" onClick={()=>showModal()}>Ver mais</button>
              </div>
            </div>
          </div>
          
        ))}
      </div>
    <div>
      <Modal
        title="Preencha os dados para continuar"
        visible={visible}
        onOk={e => handleOk(e)}
        onCancel={e => handleCancel(e)}
      >
        <form id="form">
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <input type="text" name="nome" class="form-control" placeholder="Entre com o nome" required/>
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <input type="text" name="email" class="form-control" placeholder="Entre com o e-mail" required/>
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <input type="text" name="telefone" class="form-control" placeholder="Entre com o telefone" required/>
            </div>
          </div>
          {/* <button type="submit">Cadastrar</button> */}
        </form>
      </Modal>
    </div>
</>
  )
}
