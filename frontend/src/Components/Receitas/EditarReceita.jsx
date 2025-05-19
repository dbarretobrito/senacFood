import React, { useEffect, useState } from "react";
import { Header } from "../Generics/Header";
import Copyrights from "../Generics/Copyrights";
import styles from "./EditarReceita.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";

export const EditarReceita = () => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [receita, setReceita] = useState({
    title: "",
    ingredients: "",
    steps: "",
    category: "",
    difficulty: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const tokenDecoded = jwtDecode(token);
        const userId = tokenDecoded.id;

        axios.get(`http://localhost:3333/users/${userId}`)
          .then((response) => {
            setNomeUsuario(response.data.name);
          })
          .catch((error) => {
            console.error("Erro ao buscar usuário: ", error);
          });

        axios.get(`http://localhost:3333/recipes/${id}`)
          .then((response) => {
            setReceita(response.data);
          })
          .catch((error) => {
            console.error("Erro ao buscar receita: ", error);
          });

      } catch (error) {
        console.error("Erro ao decodificar token: ", error);
      }
    }
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceita(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
  try {
    await axios.put(`http://localhost:3333/recipes/${id}`, receita, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    navigate('/listarReceitas');
  } catch (error) {
    console.error("Erro ao atualizar receita: ", error.response?.data || error);
  }
};


  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3333/recipes/${id}`);
      navigate('/listarReceitas');
    } catch (error) {
      console.error("Erro ao excluir receita: ", error);
    }
  };

  const handleBack = () => {
    navigate('/listarReceitas');
  };

  return (
    <div className={styles.page}>
      <Header userName={nomeUsuario} />
      <div className={styles.mainContent}>
        <p className={styles.titleRecipe}>Editar Receita: {receita.title}</p>
        <div className={styles.contentDiv}>
          <label className={styles.label}>Nome da receita:</label>
          <input
            className={styles.input}
            name="title"
            value={receita.title}
            onChange={handleChange}
          />

          <label className={styles.label}>Ingredientes:</label>
          <textarea
            className={styles.inputText}
            name="ingredients"
            value={receita.ingredients}
            onChange={handleChange}
          />

          <label className={styles.label}>Passos:</label>
          <textarea
            className={styles.inputText}
            name="steps"
            value={receita.steps}
            onChange={handleChange}
          />

          <label className={styles.label}>Categoria:</label>
          <input
            className={styles.input}
            name="category"
            value={receita.category}
            onChange={handleChange}
          />

          <label className={styles.label}>Dificuldade:</label>
          <input
            className={styles.input}
            name="difficulty"
            value={receita.difficulty}
            onChange={handleChange}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.backBtn} onClick={handleBack}>Voltar</button>
          <button className={styles.updateBtn} onClick={handleUpdate}>Atualizar Receita</button>
        </div>
      </div>
      <Copyrights />
    </div>
  );
};
