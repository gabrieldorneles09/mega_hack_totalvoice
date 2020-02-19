import React, { useState, useEffect } from "react";

import "../css/global.css";
import "../css/content.css";

// import Card from './Card'

// import InputMask from 'react-input-mask';

import axios from "axios";
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
  const [sms, setSms] = useState()
  const [visibleToken, setVisibleToken] = useState(false);
  const [visibleDados, setVisibleDados] = useState(false);
  const [dados, setDados] = useState([]);
  const [id, setId] = useState();

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

    // let nome = document.getElementById('nome').value
    // let email = document.getElementById('email').value
    let telefone = document.getElementById('telefone').value 

    

    // console.log(request)
    

   async function sendSms(){
     const urlSms = 'http://localhost:3333/sms'
     await axios.post(urlSms, { telephone: telefone })
       .then(response => {
         console.log("response sms: ", response)
         setSms(response.data)
       }).catch(error => {
         console.log("DEU RUIM SMS!", error)
       })
   }
    const retirn = sendSms()

    setVisible(false)
    alert("Enviamos um sms para seu celular");
    setVisibleToken(true)
    // const request = {
    //   "email": email,
    //   "telephone": telefone,
    //   "nome": nome,
    //   "cep": data,
    //   "sms_id": sms,
    // }

    // let jsonForm = JSON.stringify(request);
    // console.log(jsonForm)

    // const urlInsertData = 'http://localhost:3333/customers';
    // axios.post(urlInsertData,jsonForm).then(response =>{
    //   console.log("response: ",response)
    //   setResponseInsertData(response)
    // }).catch(error =>{
    //   console.log("DEU RUIM!",error)
    // })
    // console.log("PASSOU: ",responseInsertData)
    // setVisible(false)
  };

  function envToken(e){
    console.log("envToken!");
    console.log("id: ",id);
    
    async function getDados() {
      const urlDados = `http://localhost:3333/services/${id.id}`
      const response = await axios.get(urlDados)
      const dados = response.data;
      console.table("dados empresa: ", dados);
      setDados(dados);
    }
    getDados()
    setVisibleToken(false)
    setVisibleDados(true)
  }
  function dadosEmpresa(e){

  }
  
  function showModal(valor) {
    console.log("valor",valor);
    setId(valor)
    setVisible(true);
  }

  function handleCancel(e) {
    console.log(e);
    setVisible(false);
  }
  function handleCancel2(e){
    setVisibleToken(false)
  }
  function handleCancel3(e){
    setVisibleToken(false)
  }

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
                <button className="btn btn-success" onClick={valor => showModal(repo)}>
                  Ver mais
                </button>
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
            {/* <div class="row">
              <div class="col-xs-12 col-md-12">
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  class="form-control"
                  placeholder="Entre com o nome"
                  required
                />
              </div>
            </div>
            <br /> */}
            {/* <div class="row">
              <div class="col-xs-12 col-md-12">
                <input
                  id="email"
                  type="text"
                  name="email"
                  class="form-control"
                  placeholder="Entre com o e-mail"
                  required
                />
              </div>
            </div>
            <br /> */}
            <div class="row">
              <div class="col-xs-12 col-md-12">
                <input
                  id="telefone"
                  type="text"
                  name="telefone"
                  class="form-control"
                  placeholder="Entre com o telefone"
                  required
                />
              </div>
            </div>
          </form>
        </Modal>
        <Modal
          title="Preencha o token recebido"
          visible={visibleToken}
          onOk={e => envToken(e)}
          onCancel={e => handleCancel2(e)}
        >
          {/* <form> */}
            <div class="row">
              <div class="col-xs-12 col-md-12">
                <input
                  id="token"
                  type="text"
                  name="token"
                  class="form-control"
                  placeholder="Entre com o token"
                  required
                />
              </div>
            </div>
          {/* </form> */}
        </Modal>

        <Modal
          title={`dados do plano Claro`}
          visible={visibleDados}
          onOk={e => dadosEmpresa(e)}
          onCancel={e => handleCancel3(e)}
        >
          {/* <form> */}
            <div class="row">
              <div class="col-xs-12 col-md-12">
                <table class="table table-striped table-responsive">
                  <thead>
                    <tr>
                      <th>tipo</th>
                      <th>megas</th>
                      <th>download</th>
                      <th>upload</th>
                    </tr>
                  </thead>
                <tbody>
                  {/* <tr> */}
                {dados.map(repo => (
                 <> 
                 <tr>
                  
                    <td>{repo.tipo}</td> 
                    <td>{repo.megas}</td>
                    <td>{repo.velocidade_download}</td>
                    <td>{repo.velocidade_upload}</td>
                  
                    </tr>
                  </>
                ))}
                  {/* </tr> */}
                </tbody>
              </table>
              <p>Um de nossos atendentes ira entrar em contato com você</p>
              </div>
            </div>
          {/* </form> */}
        </Modal>

      </div>
    </>
  );
}
