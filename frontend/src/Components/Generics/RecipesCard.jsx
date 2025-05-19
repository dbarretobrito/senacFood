import { useNavigate } from 'react-router-dom';

import styles from './RecipesCard.module.css';

export const Recipes = ({id, title, category, difficulty}) => {
  
  const navigate = useNavigate();

  const goRecipe = () => {
    navigate(`/receita/${id}`);
  }

  return (
    <>
    <div className={styles.cardContent} onClick={goRecipe}>
      <p className={styles.paragrafo}>{title}</p>
      <div className={styles.divisor}></div>
      <p className={styles.paragrafo}>{category}</p>
      <div className={styles.divisor}></div>
      <p className={styles.paragrafo}>{difficulty}</p>
    </div>
    </>
  )
}
