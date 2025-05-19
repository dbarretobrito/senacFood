import React from "react";
import { Header } from "../Generics/Header";
import Copyrights from "../Generics/Copyrights";
import styles from "./Receita.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";

export const Receita = () => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [receita, setRecipes] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      try {
        const tokenDecoded = jwtDecode(token);
        const userId = tokenDecoded.id;

        axios
          .get(`http://localhost:3333/users/${userId}`)
          .then((response) => {
            setNomeUsuario(response.data.name);
          })
          .catch((error) => {
            console.error("Erro ao buscar receitas: ", error);
          });

        axios.get(`http://localhost:3333/recipes/${id}`).then((response) => {
          setRecipes(response.data);
        });
      } catch (error) {
        console.error("Erro: ", error);
      }
    }
  }, [id, token]);

  const handleDelete = async () => {
    try{
      await axios.delete(`http://localhost:3333/recipes/${id}`);
      navigate('/listarReceitas')
    }catch (error){
      console.error("Erro: ", error);
    }
  }

  
  const handleBack = () => {
    navigate('/listarReceitas')
  }
  const handleEdit = () => {
  navigate(`/editarReceita/${id}`)
  }
  return (
    <>
      <div className={styles.page}>
        <Header userName={nomeUsuario} />
        <div>
          <div className={styles.mainContent}>
            <p className={styles.titleRecipe}>Receita: {receita.title}</p>
            <div className={styles.contentDiv}>
              <p className={styles.paragrafoAPI}>Nome da receita: {receita.title}</p>
              <div className={styles.divisor}></div>
              <p className={styles.paragrafoAPI}>Ingredientes da receita: {receita.ingredients}</p>
              <div className={styles.divisor}></div>
              <p className={styles.paragrafoAPI}>Passos da receita: {receita.steps}</p>
              <div className={styles.divisor}></div>
              <p className={styles.paragrafoAPI}>Categoria da receita: {receita.category}</p>
              <div className={styles.divisor}></div>
              <p className={styles.paragrafoAPI}>Dificuldade da receita: {receita.difficulty}</p>
            </div>
            <div>
              <button className={styles.backBtn} onClick={handleBack}>Voltar</button>
              <button className={styles.deleteBtn} onClick={handleDelete}>Excluir receita</button>
              <button className={styles.deleteBtn} onClick={handleEdit}>Editar receita</button>
            </div>
          </div>
        </div>
        <Copyrights />
      </div>
    </>
  );
};
