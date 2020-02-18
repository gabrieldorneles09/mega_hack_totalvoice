import React, { useState, useEffect } from "react";

import "../css/global.css";
import "../css/content.css";

// import Card from './Card'

// import InputMask from 'react-input-mask';
import axios from "axios"
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
    // console.log("search:",value, l/services/:idoad);
  }

  useEffect(() => {
    async function fetchData() {
      if (load != 0) {
         const url = "http://localhost:3333/providers/";
        try {
          const response = await axios.get(url);
          console.log(response);
          setResponseSearch(response);
          console.log(responseSearch);

          const dados = response.data;
          console.table(dados);
          setRepositories(dados);
          setLoad(0);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [load]);

  function handleOk(e)  {
    console.log(e); 

    let cep = document.getElementById('cep').value
    let email = document.getElementById('email').value
    let telefone = document.getElementById('telefone').value 

    const request =   {
      "email": email,
      "telephone": telefone,
      "cep": cep,
    }

    console.log(request)
    let jsonForm = JSON.stringify(request);
    console.log(jsonForm)
    const urlInsertData = 'http://localhost:3333/customers';
    axios.post(urlInsertData,jsonForm).then(response =>{
      console.log(response)
      setResponseInsertData(response)
    }).catch(error =>{
      console.log(error)
    })
    console.log(responseInsertData)
    setVisible(false)
  };dif

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
                <p>{repo.cidade}</p>
              </div>
              <div class="card-body">
                <p>{repo.cnpj}</p>
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
              <input id="cep" type="text" name="cep" class="form-control" placeholder="Entre com o cep" required/>
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <input id="email" type="text" name="email" class="form-control" placeholder="Entre com o e-mail" required/>
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <input id="telefone" type="text" name="telefone" class="form-control" placeholder="Entre com o telefone" required/>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <input id="token" type="text" name="token" class="form-control" placeholder="Entre com o token" required/>
            </div>
          </div>
          {/* <button type="submit">Cadastrar</button> */}
        </form>
      </Modal>
    </div>
</>
  )
}
