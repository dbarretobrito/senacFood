import React from 'react'
import styles from './Cards.module.css'

 const Cards = ( {title, img} ) => {
  return (
    <>
        <div className={styles.mainSection}>
            <div className={styles.mainContent}>

                <img src={img} alt="" />
                <p className={styles.paragraph}>{title}</p>
            </div>
        </div>
    </>
  )
}
export default Cards;