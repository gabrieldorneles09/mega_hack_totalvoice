import React, { useState, useEffect } from 'react';

import '../css/global.css'
import '../css/content.css'

// import InputMask from 'react-input-mask';
// import axios from 'axios'
import { Typography, Input, Card } from 'antd';

// const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

  export default function Conteudo(){
    
    //state cria assim
    const [load, setLoad] = useState(0)
    const [data, setData] = useState('')
    const [repositories, setRepositories] = useState([])


    function search(value) {
      //  console.log(value);

      //atualiza o state do load
      setData(value)
      setLoad(1)
      // console.log("search:",value, load);

    }

    useEffect(async () => {
      if(load != 0){
        const url = 'https://api.github.com/users/renatoReboucas/repos'
        const response = await fetch(url)
        const dados = await response.json()
        console.table(dados)
        setRepositories(dados)
        setLoad(0)
      }

    }, [load])

    return(
    <>
          <div className="row margTop">
            {load}
            <div className="col-md-12 col-xs-12 offset-md-4">
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
      {/* <br/> */}
        <div className="row margTop">
          {repositories.map(repo =>(
            <div className="col-md-4 col-xs-12">
              
                <Card key={repo.id} title={repo.name} extra={<a href={repo.html_url}>Mais</a>} style={{ width: 300 }}>
                  <p>{repo.description}</p>
                </Card>
                <br></br>
              
            </div>
          ))}


      </div>
      </>
    )
  }

    

