// Neste arquivo é definido a página de login do sistema
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@mui/material/Alert";
import Link from "@material-ui/core/Link";
const axios = require("axios").default;

function Login() {
  var [authStatus, setAuthStatus] = useState(null);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  });

  function onSubmit() {
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        email: inputValues.email,
        senha: inputValues.password,
      })
      .then((res) => {
        if (res.data.accesstoken) {
          const accessToken = res.data.accesstoken;
          localStorage.setItem("accesstoken", res.data.accesstoken);
          localStorage.setItem("userId", res.data.usuario.id);
          localStorage.setItem("username", res.data.usuario.nome);
          localStorage.setItem("usertype", parseInt(res.data.usuario.id_perfil_usuario));
          setAuthStatus(true);
          return navigate("/");
        } else {  
          setAuthStatus(false);
        }
      });
  }
  return (
    <div>
      <div className="duascolunas fundo-login container-login" style={{padding: "5%"}}>
        <div className="content-login">
          <img
            className="mb-5 pt-5"
            style={{ width: "100%" }}
            src={require("../../images/logovertical.png")}
            alt="logo"
          />
        </div>
        <Container className="content-login" component="main" maxWidth="xs">
          <div className="mt-3 mt-md-5">
            <div className="text-center">
              {authStatus === false ? (
                <Alert className="mb-2" variant="filled" severity="error">
                  Email e Senha não encontrados no sistema
                </Alert>
              ) : (
                ""
              )}
              {authStatus === true ? (
                <Alert className="mb-2" variant="filled" severity="success">
                  Autenticação completa
                </Alert>
              ) : (
                ""
              )}
              <Typography component="h1" variant="h6"></Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                onChange={handleOnChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    onSubmit();
                  }
                }}
              ></TextField>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Senha"
                name="password"
                type="password"
                onChange={handleOnChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    onSubmit();
                  }
                }}
              ></TextField>
              <Button
                type="button"
                variant="contained"
                fullWidth
                color="primary"
                size="large"
                className="mb-3 mb-md-4 mt-4 backgroundcolor1"
                onClick={() => onSubmit()}
              >
                Entrar
              </Button>
              <Link href="/criar-usuario">
                <Button
                  style={{ backgroundColor: "#FFC701" }}
                  type="button"
                  variant="contained"
                  fullWidth
                  color="secondary"
                  size="large"
                  className="mb-3 mb-md-4 mt-4 backgroundcolor2"
                >
                  Cadastrar
                </Button>
              </Link>

              <Link href="/">
                <Button
                  type="button"
                  variant="contained"
                  fullWidth
                  color="secondary"
                  size="large"
                  className="mb-3 mb-md-4 mt-5 backgroundcolor4"
                >
                  Voltar
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Login;
