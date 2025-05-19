import React, { useState } from "react";
import axios from "axios";
import styles from "./CreateUser.module.css";
import Copyrights from "./Generics/Copyrights";
import { useNavigate } from "react-router-dom";

export const CreateUser = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3333/users/register",
        formData
      );

      setFormData({ name: "", email: "", password: "" });
      navigate("/login");
    } catch (error) {
      setErrorMessage("Todas as informações devem ser preenchidas!");
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.divForm}>
          <div className={styles.error}>
            <p className={styles.registerError}>{errorMessage}</p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.labels}>Nome: </label>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              className={styles.userInputs}
              value={formData.name}
              onChange={handleChange}
            />
            <label className={styles.labels}>E-mail: </label>
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              className={styles.userInputs}
              value={formData.email}
              onChange={handleChange}
            />
            <label className={styles.labels}>Senha: </label>
            <input
              type="password"
              name="password"
              placeholder="Senha"
              className={styles.userInputs}
              value={formData.password}
              onChange={handleChange}
            />
            <button className={styles.submitBtn}>Enviar</button>
            <div className={styles.login}>
              <p className={styles.loginParagraph}>
                Já possui uma conta?{" "}
                <a href={"/login"} className={styles.links}>
                  Logar-se
                </a>
              </p>
            </div>
          </form>
        </div>
        <footer className={styles.footerContent}>
          <p className={styles.copyP}>
            &copy; 2025 Projeto desenvolvido como parte das atividades
            acadêmicas do curso de Análise e Desenvolvimento de Sistemas -
            Centro Universitário Senac. Realizado por ANDRE FERREIRA DA SILVA,
            DANIEL BARRETO BRITO, GABRIELA DE VALNISIO FERREIRA DE ANDRADE,
            GUILHERME AUGUSTO FORTUNA FERREIRA, MARCELO RODRIGUES, MIGUEL
            KAULING MARTINI, RUAN SOUZA PAIM, THIAGO THOMAZ PEREIRA. Todos os
            direitos reservados.
          </p>
        </footer>
      </div>
    </>
  );
};
