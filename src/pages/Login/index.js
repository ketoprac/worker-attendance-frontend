import axios from "axios";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import styles from "./Login.module.css";

const Login = () => {
  const URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkYks3_91K6hO7V25KevrrMAMeewj3pbM"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
 
    const res = await axios({
      method: "POST",
      url: URL,
      headers: {'Content-type': 'application/json'},
      data: {
        email,
        password,
        returnSecure: true,
      }
    });

    if (res.data) {
      await window.localStorage.setItem("token", JSON.stringify(res.data.idToken));
    }


    console.log(res);
  }

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={submit}>
          <h2>Sign in</h2>
          <div className={styles.input__container}>
            <label for="email">Email: </label>
            <input onChange={(e) => setEmail(e.target.value)} name="email" type="text" />
          </div>
          <div className={styles.input__container}>
            <label for="password">Password: </label>
            <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" />
          </div>
          <Button onClick={submit} variant="primary" title="Login" />
          <Button variant="tertiary" title="Forgot password?" />
        </form>
      </div>
    </>
  );
};

export default Login;
