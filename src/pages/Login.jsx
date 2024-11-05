import styles from "./Login.module.css";
import {useEffect, useState} from "react"
import PageNav from "../Components/PageNav";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Button from "../Components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const {login,isAuthenticated} = useAuth()

  const navigate = useNavigate()

  const [correntDetails,setCorrectDetails] = useState(true)


  function handleSubmit(e)
  {

     e.preventDefault()
     const res = login(email,password)
     if(res)
      setCorrectDetails(true)

     if(!res)
      setCorrectDetails(false)
     
  }


  useEffect(() => {

    if(isAuthenticated)
      navigate("/app",{replace: true})

  },[isAuthenticated])

  return (
    <main className={styles.login}>

      <PageNav />  

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div style={{textAlign : "center",color : "red"}}>
        {!correntDetails && "Please check the details"}
        </div>

        <div className={styles["login-btn-wrapper"]}>
          <Button type={"primary"}>Login</Button>
        </div>
      </form>
    </main>
  );
}
