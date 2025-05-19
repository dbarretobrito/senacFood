
import { useNavigate } from 'react-router-dom';
import { Header } from './Generics/Header';
import Copyrights from './Generics/Copyrights';
import styles from './MainPage.module.css'



const MainPage = () => {
    const navigate = useNavigate();

    const handleRegister = ()=>{
        navigate('/registrar')
    }
     const handleLogin = ()=>{
        navigate('/login')
    }

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.ButtonsDiv}>
        <div className={styles.mainButtons}>
          <button className={styles.registerBtn} onClick={handleRegister}>Registrar-se</button>
          <button className={styles.loginBtn} onClick={handleLogin}>Logar-se</button>
        </div>
        </div>
        <Copyrights/>
      </div>
    </>
  )
}

export default MainPage;