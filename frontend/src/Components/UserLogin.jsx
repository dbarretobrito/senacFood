import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./UserLogin.module.css";

import Copyrights from "./Generics/Copyrights";

export const UserLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3333/users/login",
        formData
      );

      const { token } = response.data;
      localStorage.setItem("token", token);

      if (token) {
        navigate("/logado");
      }
    } catch (error) {
      console.error(
        "Erro ao fazer login:",
        error.response?.data || error.message
      );
      setErrorMessage("E-mail ou senha incorretos.");
    }
  };

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.formulario_Container}>
          <div className={styles.divForm}>
            <div className={styles.error}>
              <p className={styles.errorLogin}>{errorMessage}</p>
            </div>
            <form className={styles.formField} onSubmit={handleSubmit}>
              <div className={styles.emailField}>
                <label className={styles.labels}>E-mail:</label>
                  <input
                  className={styles.userInputs}
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  />
              </div>
              <div className={styles.emailField}>
                <label className={styles.labels}>Senha:</label>
                  <input
                  className={styles.userInputs}
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleChange}
                  />
                </div>
              <button className={styles.submitBtn} type="submit" onClick={handleSubmit}>
                Enviar
              </button>
              <div className={styles.register}>
                <p className={styles.registerParagraph}>Não possui uma conta? <a href={"/registrar"} className={styles.links}>Registre-se</a></p>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.paragrafos}>
          <p className={styles.paragraph}>
            "Descubra receitas práticas e criativas, adaptadas aos seus
            ingredientes e experiência, para transformar seu dia a dia na
            cozinha de forma simples e sustentável!”
          </p>
        </div>
      </div>
    </>
  );
};
