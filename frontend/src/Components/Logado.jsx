import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import styles from './Logado.module.css';
import reciptsIcon from "../Assets/forkKnife.png"
import { Header } from './Generics/Header';
import Copyrights from './Generics/Copyrights';
import Cards from './Generics/Cards';

 export const Logado = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token){
      try{
        const tokenDecoded = jwtDecode(token);  
        const userId = tokenDecoded.id;
        
        axios.get(`http://localhost:3333/users/${userId}`)
        .then(response =>{
          setNomeUsuario(response.data.name);
        })
        .catch(error => {
          console.error("Erro ao buscar: ", error);
        })
      } catch(error){
        console.error("Erro ao decodificar", error)
      }
    }
  }, []);

  const CreateRecipe = () => {
    navigate('/criarReceita');
  }

  const handleFavs = () => {
    navigate('/listarReceitas')
  }
  

  return (
    <>
      <div className={styles.divPrincipal}>
          <Header userName={nomeUsuario}/>
          <div className={styles.mainContent}>
            <div onClick={CreateRecipe}>
              <Cards title="Criar Receitas" img={reciptsIcon}/>
            </div>
            <div onClick={handleFavs}>
              <Cards title="Favoritos" img={reciptsIcon}/>
            </div>
          </div>
        <Copyrights className={styles.copyrights}/>
      </div> 
    </>
  )
}
