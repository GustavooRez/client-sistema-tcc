// Neste arquivo é definido a página de realizar Registro do Tcc
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Alert from "@mui/material/Alert";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from 'axios';

export default function RegistroTfg() {
  const [inputValues, setInputValues] = useState({
    titulo: "",
    palavrasChave: "",
    introducao: "",
    objetivos: "",
    bibliografia: "",
    metodologia: "",
    resultados: "",
  });

  const idTcc = localStorage.getItem("userTccId");
  const navigate = useNavigate();
  var [status, setStatus] = useState(true);

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  });

  function onSubmit() {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/tfg/${idTcc}`,
        {
          titulo: inputValues.titulo,
          palavras_chave: inputValues.palavras_chave,
          introducao: inputValues.introducao,
          objetivos: inputValues.objetivos,
          bibliografia: inputValues.bibliografia,
          metodologia: inputValues.metodologia,
          resultados: inputValues.resultados
        }, 
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      ).then((response) => {
        if(response.data.status === 200){
          axios
            .put(
              `${process.env.REACT_APP_API_URL}/tfg/${idTcc}/status`,
              {
                status_tfg: "registro_de_projeto_realizado"
              }, 
              {
                headers: {
                  Authorization: localStorage.getItem("accesstoken"),
                },
              }
            ).then((response) => {
              localStorage.setItem("userTccStatus","registro_de_projeto_realizado")
              return navigate("/");
            })
        }else{
          setStatus(response.data.error)
        }
      })
  }

  return (
    <Container component="main" maxWidth="sm">
      <div className="mt-3 mt-md-5">
        <div className="text-center">
          <Typography className="pb-5 pt-2" component="h1" variant="h4">
              Registrar Projeto
          </Typography>
        </div>
          {status !== true ? (
              <Alert className="mt-2 mb-4" variant="filled" severity="error">
                {status}
              </Alert>
            ) : (
              ""
            )}
        <InputLabel
          style={{ textAlign: "left" }}
          className={"mt-2 mb-0"}
          id="label-titulo"
        >
          Título
        </InputLabel>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="titulo"
          labelId="label-titulo"
          name="titulo"
          onChange={handleOnChange}>
          </TextField>

          <InputLabel
          style={{ textAlign: "left" }}
          className={"mt-2 mb-0"}
          id="label-palavras"
        >
          Palavras-chave
        </InputLabel>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="palavras_chave"
          labelId="label-palavras"
          name="palavras_chave"
          onChange={handleOnChange}>
          </TextField>

          <InputLabel
          style={{ textAlign: "left" }}
          className={"mt-2 mb-0"}
          id="label-introducao"
        >
          Introdução/Justificativa/Relevância
        </InputLabel>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="introducao"
          labelId="label-introducao"
          name="introducao"
          onChange={handleOnChange}>
        </TextField>

        <InputLabel
          style={{ textAlign: "left" }}
          className={"mt-2 mb-0"}
          id="label-objetivos"
        >
          Objetivos
        </InputLabel>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="objetivos"
          labelId="label-objetivos"
          name="objetivos"
          onChange={handleOnChange}>
        </TextField>

        <InputLabel
          style={{ textAlign: "left" }}
          className={"mt-2 mb-0"}
          id="label-bibliografia"
        >
          Bibliografia básica
        </InputLabel>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="bibliografia"
          labelId="label-bibliografia"
          name="bibliografia"
          onChange={handleOnChange}>
        </TextField>

        <InputLabel
          style={{ textAlign: "left" }}
          className={"mt-2 mb-0"}
          id="label-metodologia"
        >
          Metodologia
        </InputLabel>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="metodologia"
          labelId="label-metodologia"
          name="metodologia"
          onChange={handleOnChange}>
        </TextField>

        <InputLabel
          style={{ textAlign: "left" }}
          className={"mt-2 mb-0"}
          id="label-resultados"
        >
          Resultados esperados
        </InputLabel>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="resultados"
          labelId="label-resultados"
          name="resultados"
          onChange={handleOnChange}>
        </TextField>

        <Button
          type="button"
          variant="contained"
          fullWidth
          color="primary"
          size="large"
          className="mb-3 mb-md-4 mt-4 backgroundcolor2"
          onClick={() => (onSubmit())}
        >
          Registrar
        </Button>
      </div>
    </Container>
  );

}