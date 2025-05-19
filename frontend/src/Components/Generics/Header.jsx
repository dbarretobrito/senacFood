import React, { useEffect } from "react";
import styles from './Header.module.css';
import userIcon from "../../Assets/userIcon.png";
import { useNavigate } from "react-router-dom";

export const Header = ( {userName}) => {
  const navigate = useNavigate();

  const logOut = () => { 
    localStorage.removeItem("token");
    navigate('/login');
  }

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <p className={styles.pLogo}></p>
          <nav className={styles.navUser}>
            <div className={styles.usuarioContainer}>
              <p className={styles.userName}>{userName}</p>
              <div className={styles.userDiv} onClick={logOut}>
                <img src={userIcon} alt="" className={styles.userIcon} />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
