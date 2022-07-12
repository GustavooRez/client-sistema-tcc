// Neste arquivo é definido a página de Criar Perfil Professor
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@mui/material/Alert";
import Link from "@material-ui/core/Link";
const axios = require("axios").default;

function CriarPerfilProfessor() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  var [status, setStatus] = useState(true);
  const [inputValues, setInputValues] = useState({
    descricao: "",
    areas_atuacao: "",
    link: "",
  });

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/professor/${userId}/user`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        if (res.data.status !== 201) {
          return navigate("/");
        }
      });
  },[]);

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  });

  function onSubmit() {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/professor`,
        {
          descricao: inputValues.descricao,
          areas_atuacao: inputValues.areas_atuacao,
          link: inputValues.link,
          id_usuario: userId
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          return navigate("/meu-perfil-professor");
        } else {
          setStatus(res.data.error);
        }
      });
  }
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className="mt-3 mt-md-5">
          <div className="text-center">
            <Typography className="pb-5 pt-2" component="h1" variant="h4">
              Criar perfil professor
            </Typography>
            {status !== true ? (
              <Alert className="my-2" variant="filled" severity="error">
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
              id="descricao"
              label="Descrição"
              name="descricao"
              onChange={handleOnChange}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="areas_atuacao"
              label="Aréas de atuação"
              name="areas_atuacao"
              onChange={handleOnChange}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="link"
              label="Link página pessoal"
              name="link"
              onChange={handleOnChange}
            ></TextField>
            <Button
              type="button"
              variant="contained"
              fullWidth
              color="primary"
              size="large"
              className="mb-3 mb-md-4 mt-4 backgroundcolor2"
              onClick={() => onSubmit()}
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CriarPerfilProfessor;
