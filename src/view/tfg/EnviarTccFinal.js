// Neste arquivo é definido a página de Enviar Tcc Final
import React from 'react';
import { useNavigate } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import axios from 'axios';

export default function EnviarTccFinal() {
  const navigate = useNavigate();
  const idTcc = localStorage.getItem("userTccId");

  function onSubmit() {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/tfg/${idTcc}/status`,
        {
          status_tfg: "tfg_final_enviado"
        }, 
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      ).then((response) => {
        localStorage.setItem("userTccStatus","tfg_final_enviado")
        return navigate("/");
      })
  }

  return (
    <Container component="main" maxWidth="sm">
      <div className="mt-3 mt-md-5">
        <div className="text-center">
          <Typography className="pb-5 pt-2" component="h1" variant="h4">
            Enviar TCC Final
          </Typography>
          <Typography className="pb-5 pt-2" >
            Acesse o link abaixo para realizar o envio final de seu TCC. Quando tiver enviado, por favor, clique no botão abaixo.
          </Typography>
          <a className="py-2" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfofGOAHar5LfkpbJgm8r5_TTx8E89tIV8g_b_BZmdDyb8fFQ/viewform">Link de envio</a>
          <Button
            type="button"
            variant="contained"
            fullWidth
            color="primary"
            size="large"
            className="mb-3 mb-md-4 mt-4 backgroundcolor2"
            onClick={() => (onSubmit())}
          >
            Enviar
          </Button>
        </div>
      </div>
    </Container>
  );
}