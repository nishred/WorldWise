import React from "react";

import styles from "./Button.module.css"

const Button = ({children,onClick,type,style}) => {

  return (

   <button style={style} className={`${styles.btn} ${styles[type]}`} onClick={onClick}>{children}</button>


  )

}

export default Button