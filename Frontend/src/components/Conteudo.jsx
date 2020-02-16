import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileRequest } from '../user/actions';

import "../css/global.css";
import "../css/content.css";

// import Card from './Card'

// import InputMask from 'react-input-mask';
// import axios from 'axios'
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

  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function insertUser(data) {
    dispatch(updateProfileRequest(data));
  }

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
        const url = "https://api.github.com/users/renatoReboucas/repos";
        const response = await fetch(url);
        const dados = await response.json();
        console.table(dados);
        setRepositories(dados);
        setLoad(0);
      }
    }
    fetchData();
  }, [load]);

  function showModal() {

       setVisible(true)

  };

  function handleOk(e)  {
    console.log(e);
    setVisible(false)
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
        <form initialData={profile} onSubmit={insertUser}>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <input type="text" name="nome" class="form-control" placeholder="Entre com o nome" />
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <input type="text" name="email" class="form-control" placeholder="Entre com o e-mail" />
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <input type="text" name="telefone" class="form-control" placeholder="Entre com o telefone" />
            </div>
          </div>
        </form>
      </Modal>
    </div>
</>
  )
}
