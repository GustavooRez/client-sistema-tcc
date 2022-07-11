// Neste arquivo é definido a página de Confirmar Projeto
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@mui/material/Alert";
import Link from "@material-ui/core/Link";
const axios = require("axios").default;

function ConfirmarProjeto() {
  const [requisition, setRequisition] = useState(false);
  const [registros, setRegistros] = useState([]);
  const idUsuario = localStorage.getItem("userId");
  const navigate = useNavigate();
  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/tfg/search-users-record/${idUsuario}`,
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        if (res.data.status !== 200) {
            setRegistros(null);
        } else {
            setRegistros(res.data.resultsTfg);
        }
        setRequisition(true);
      });
  }, []);

  function rejeitar(idTcc) {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/tfg/${idTcc}/status`,
        {
          status_tfg: "registro_de_projeto_reprovado",
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((response) => {
        window.location.reload();
      });
  }

  function aceitar(idTcc) {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/tfg/${idTcc}/status`,
        {
          status_tfg: "registro_de_projeto_aprovado",
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((response) => {
        window.location.reload();
      });
  }
  return (
    <div>
      <Container component="main" maxWidth="sm">
        <div className="mt-3 mt-md-5">
          {requisition === true ? (
            registros !== null ? (
              <div>
                <h2 className="text-center pt-3 pb-5">Matrículas</h2>
                <div>
                  {registros.map((registro) => (
                    <div className="py-1 d-flex align-items-center">
                      <div
                        className="col-8 py-2"
                        style={{
                          backgroundColor: "white",
                          borderRadius: "10px",
                          border: "1px solid #ececec",
                          boxShadow:
                            "0 1px 3px 0 rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),0 2px 1px -1px rgb(0 0 0 / 12%)",
                        }}
                      >
                        {registro.nome}
                      </div>
                      <div className="mx-2">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => rejeitar(registro.id)}
                        >
                          Rejeitar
                        </button>{" "}
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => aceitar(registro.id)}
                        >
                          Aprovar
                        </button>{" "}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h3 className="text-center py-5">
                Não existem registros a serem aceitas/recusadas
              </h3>
            )
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
}

export default ConfirmarProjeto;
