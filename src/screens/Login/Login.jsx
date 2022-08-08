import React, { useEffect, useState } from "react";
// FIREBASE
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../../firebase.config.js";
// MUI
import { Button, TextField, Typography, Grid } from "@mui/material";
import { Container } from "@mui/system";
// SCSS
import styles from "./Login.module.scss";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginEmailPassword = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      setIsError(true);
    }
  };
  const handleSigninWithGoogle = async () => {
    const user = await signInWithPopup(auth, provider);
    dispatch(
      login({
        displayName: user.user.displayName,
        email: user.user.email,
        photoURL: user.user.photoURL,
        uid: user.user.uid,
      })
    );
  };
  const creatAccount = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      localStorage.setItem("user", JSON.stringify(user.user));
      console.log(user);
    } catch (error) {
      console.log(error.code);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
        navigate("/");
      } else {
        dispatch(logout);
        navigate("/login");
      }
      return;
    });

    return () => {
      unsubcribe();
    };
  }, []);

  return (
    <Grid className={styles.wrapper}>
      <Container className={styles.container}>
        <Typography variant="h3" align="center" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            label="Username"
            variant="outlined"
          />
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            label="Password"
            variant="outlined"
          />

          <Button
            fullWidth
            variant="contained"
            onClick={loginEmailPassword}
            type="submit"
          >
            Login
          </Button>
          <Button fullWidth variant="outlined" onClick={creatAccount}>
            Creat Acount?
          </Button>
          <Button onClick={handleSigninWithGoogle} fullWidth variant="text">
            Signin with Google
          </Button>

          {isError && (
            <Typography color="secondary">
              Invalid username or password. Try Again...
            </Typography>
          )}
        </form>
      </Container>
    </Grid>
  );
}

export default Login;
