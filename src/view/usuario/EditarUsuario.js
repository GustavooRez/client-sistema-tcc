// Neste arquivo é definido a página de editar usuário
import React, { useState, useCallback } from "react";
import Container from "@material-ui/core/Container";
import "date-fns";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@mui/material/Alert";
const axios = require("axios").default;

export default function EditarUsuario() {
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("usertype");
  const [user, setUser] = React.useState(false);
  const [inputValues, setInputValues] = useState({
    nome: "",
    telefone: "",
    numero: "",
    email: "",
    senha: "",
    curso: ""
  });
  var [classStatus, setClassStatus] = useState("");
  var [status, setStatus] = useState(true);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((resUser) => {
        resUser.data.aniversario = new Date(resUser.data.aniversario);
        setInputValues({
          nome: resUser.data.usuario.nome,
          numero: resUser.data.usuario.numero,
          telefone: resUser.data.usuario.telefone,
          email: resUser.data.usuario.email,
          curso: resUser.data.usuario.id_curso,
        });
        setUser(true);
      });
  }, []);

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  });

  function onSubmit() {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
        {
          nome: inputValues.nome,
          telefone: inputValues.telefone,
          numero: inputValues.numero,
          email: inputValues.email,
          perfil_usuario: userType
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          setStatus(res.data.message);
          setClassStatus("success");
          setTimeout(() => {
            setStatus(true);
          }, 5000);
        } else {
          setStatus(res.data.error);
          setClassStatus("error");
          setTimeout(() => {
            setStatus(true);
          }, 5000);
        }
      });
  }
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className="mt-3 mt-md-5">
          <div className="text-center">
            <Typography component="h1" variant="h4">
              Editar usuario
            </Typography>
            {status !== true ? (
              <Alert className="my-2" variant="filled" severity={classStatus}>
                {status}
              </Alert>
            ) : (
              ""
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              onChange={handleOnChange}
              value={user !== false ? inputValues.nome : ""}
            >
              {" "}
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="numero"
              label="Número"
              name="numero"
              onChange={handleOnChange}
              value={user !== false ? inputValues.numero : ""}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="telefone"
              label="Telefone"
              name="telefone"
              onChange={handleOnChange}
              value={user !== false ? inputValues.telefone : ""}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              type="email"
              onChange={handleOnChange}
              value={user !== false ? inputValues.email : ""}
            ></TextField>
            <Button
              type="button"
              variant="contained"
              fullWidth
              color="primary"
              size="large"
              className="mb-3 mb-md-4 mt-4"
              onClick={() => onSubmit()}
            >
              Editar
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
