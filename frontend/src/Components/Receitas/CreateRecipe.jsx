import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import axios from "axios";

import Copyrights from "../Generics/Copyrights";
import { Header } from "../Generics/Header";
import styles from "./CreateRecipe.module.css";

export const CreateRecipe = () => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [recipeDataForm, setRecipeDataForm] = useState({
    title: "",
    ingredients: "",
    steps: "",
    category: "",
    difficulty: "",
    user_id: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const tokenDecoded = jwtDecode(token);
      const userId = tokenDecoded.id;

      const updatedForm = {
        ...recipeDataForm,
        userId: userId,
      };

      const response = await axios.post(
        "http://localhost:3333/recipes",
        updatedForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecipeDataForm({
        user_id: { userId },
        title: "",
        ingredients: "",
        steps: "",
        category: "",
        difficulty: "",
      });
      navigate("/logado");
    } catch (error) {
      setErrorMessage("Todas as informações devem ser preenchidas!");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

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
            console.error("Erro ao buscar: ", error);
          });
      } catch (error) {
        console.error("Erro ao decodificar", error);
      }
    }
  }, []);

  const handleBack = () => {
    navigate("/logado");
  };

  return (
    <>
      <div className={styles.MainContent}>
        <Header userName={nomeUsuario} />
        <div className={styles.formDiv}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.titleDiv}>
              <p className={styles.title}>Cadastrar Receita</p>
            </div>
            <div className={styles.error}>
              <p className={styles.registerError}>{errorMessage}</p>
            </div>
            <label className={styles.nameL}>Nome: </label>
            <input
              type="text"
              name="title"
              placeholder="Nome"
              className={styles.userInputs}
              value={recipeDataForm.title}
              onChange={handleChange}
            />
            <label className={styles.ingredientesL}>Ingredientes</label>
            <input
              type="text"
              name="ingredients"
              className={styles.userInputs}
              placeholder="Ingredientes"
              value={recipeDataForm.ingredients}
              onChange={handleChange}
            />
            <label className={styles.passosL}>Passos:</label>
            <textarea
              name="steps"
              className={styles.textArea}
              placeholder="Passos 1, passo2..."
              value={recipeDataForm.steps}
              onChange={handleChange}
            ></textarea>
            <label className={styles.categoriaL}>Categoria</label>
            <input
              type="text"
              name="category"
              className={styles.userInputs}
              placeholder="Categoria"
              value={recipeDataForm.category}
              onChange={handleChange}
            />
            <select
              name="difficulty"
              className={styles.selection}
              value={recipeDataForm.difficulty}
              onChange={handleChange}
            >
              <option value="">Dificuldade</option>
              <option value="easy">Fácil</option>
              <option value="normal">Médio</option>
              <option value="hard">Difícil</option>
            </select>
            <div className={styles.divisor}></div>
            <div className={styles.btn}>
              <button className={styles.voltar} onClick={handleBack}>
                Voltar
              </button>
              <button className={styles.cadastrar}>Cadastrar</button>
            </div>
          </form>
        </div>
        <Copyrights />
      </div>
    </>
  );
};
