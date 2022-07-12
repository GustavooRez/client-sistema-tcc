// Neste arquivo é definido a página de realizar Registro do Tcc
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios";

export default function StatusTcc() {
  const idUsuario = localStorage.getItem("userId");
  var [statusTcc, SetStatusTcc] = useState(true);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/check/${idUsuario}`)
      .then((response) => {
        if (response.data.code === 200) {
            SetStatusTcc(response.data.status_tfg_nome);
        } else {
            SetStatusTcc("Sem TCC");
        }
      });
  }, []);

  const idTcc = localStorage.getItem("userTccId");
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="sm">
      <div className="mt-3 mt-md-5">
        <div className="text-center">
        <p>O seu status de TCC é:</p>
          <Typography className="pb-5 pt-2" component="h1" variant="h4">
            {statusTcc}
          </Typography>
        </div>
      </div>
    </Container>
  );
}
