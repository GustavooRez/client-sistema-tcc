// Neste arquivo é definido a página de Avaliar Tfg Parcial
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "react-bootstrap/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Alert from "@mui/material/Alert";
import Link from "@material-ui/core/Link";
const axios = require("axios").default;

function AvaliarTfgParcial() {
  const [requisition, setRequisition] = useState(false);
  const [orientacoes, setOrientacoes] = useState([]);
  const [idTccAtual, setIdTccAtual] = useState(false);
  const [alunoAtual, setAlunoAtual] = useState(false);
  var [status, setStatus] = useState(true);
  const idUsuario = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    nota: "",
  });
  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/tfg/search-partial-orientation/${idUsuario}`,
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        if (res.data.status !== 200) {
          setOrientacoes(null);
        } else {
          setOrientacoes(res.data.resultsTfg);
        }
        setRequisition(true);
      });
  }, []);

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  });

  function avaliar() {
    let nota = document.getElementById("nota").value;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/tfg/${idTccAtual}/partial-tcc`,
        {
          nota,
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          window.location.reload();
        } else {
          handleClose()
          setStatus(response.data.error);
        }
      });
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function modalAvaliar(idTcc, aluno) {
    setIdTccAtual(idTcc);
    setAlunoAtual(aluno);
    handleShow();
  }

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <div className="mt-3 mt-md-5">
          {requisition === true ? (
            orientacoes !== null ? (
              <div>
                <h2 className="text-center pt-3 pb-5">TCCs Parciais</h2>
                {status !== true ? (
                  <Alert className="mb-3" variant="filled" severity="error">
                    {status}
                  </Alert>
                ) : (
                  ""
                )}
                <h5 className="pb-3">
                  Os TCCs se encontram disponíveis através do link. Por favor
                  realizar a correção e depois avaliá-los através do sistema{" "}
                </h5>
                <div style={{ textAlign: "center" }}>
                  {orientacoes.map((orientacao) => (
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
                        {orientacao.nome}
                      </div>
                      <div className="mx-2">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() =>
                            modalAvaliar(orientacao.id, orientacao.nome)
                          }
                        >
                          Avaliar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h3 className="text-center py-5">
                Não existem TCCs parciais a serem avaliados
              </h3>
            )
          ) : (
            ""
          )}
        </div>
      </Container>

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Avaliação
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: "1.2rem" }}>
            Esta será a nota parcial do aluno {alunoAtual}! Avalie com cuidado!
          </p>
          <div className="row">
            <div className="col">
              <InputLabel
                style={{ textAlign: "left", color: "black" }}
                id="label-nota"
              >
                Nota
              </InputLabel>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nota"
                labelId="label-nota"
                name="nota"
                type="number"
                onChange={handleOnChange}
              ></TextField>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleClose}
          >
            Fechar
          </button>
          <button type="button" className="btn btn-primary" onClick={avaliar}>
            Avaliar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AvaliarTfgParcial;
