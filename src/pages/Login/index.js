import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <>
    <Navbar />
      <div className={styles.container}>
        <form>
          <h2>Sign in</h2>
          <div className={styles.input__container}>
            <label for="email">Email: </label>
            <input name="email" type="text" />
          </div>
          <div className={styles.input__container}>
            <label for="password">Password: </label>
            <input name="password" type="password" />
          </div>
          <Button variant="primary" title="Login" />
          <Button variant="tertiary" title="Forgot password?" />
        </form>
      </div>
    </>
  );
};

export default Login;
