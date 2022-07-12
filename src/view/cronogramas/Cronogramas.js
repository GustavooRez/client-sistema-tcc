/* eslint-disable no-const-assign */
import React, { useState, useCallback } from "react";
import Container from "@material-ui/core/Container";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import Accordion from "react-bootstrap/Accordion";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";
const axios = require("axios").default;
import "bootstrap/dist/css/bootstrap.min.css";

export default function Cronogramas() {
  const [institutos, setInstitutos] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cronogramas, setCronogramas] = useState([]);
  const [requisitionInstituto, setRequisitionInstituto] = useState(null);
  const [requisitionCurso, setRequisitionCurso] = useState(null);
  const [requisitionCronograma, setRequisitionCronograma] = useState(null);
  var userType = localStorage.getItem("usertype");
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/universities`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((unis) => {
        let arrayUniversidades = [];
        unis.data.universidades.forEach((uni) => {
          arrayUniversidades.push({
            value: uni.id,
            label: uni.nome,
          });
        });
        setUniversidades(arrayUniversidades);
      });
  }, []);

  const handleChangeUniversidade = (event) => {
    searchInstitutes(event.value);
  };

  const handleChangeInstituto = (event) => {
    searchCourses(event.value);
  };

  const handleChangeCurso = (event) => {
    searchCronogramas(event.value);
  };

  function searchInstitutes(valueUniversidade) {
    setRequisitionInstituto(false);
    setRequisitionCurso(false);
    const arrayInstitutos = [];
    setInstitutos(arrayInstitutos);
    const arrayCursos = [];
    setCursos(arrayCursos);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/universities/${valueUniversidade}/institutes`,
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        res.data.institutos.forEach((data) => {
          arrayInstitutos.push({
            value: data.id,
            label: data.nome,
          });
        });
        setInstitutos(arrayInstitutos);
        setRequisitionInstituto(true);
      });
  }

  function searchCourses(valueInstituto) {
    setRequisitionCurso(false);
    const arrayCursos = [];
    setCursos(arrayCursos);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/institute/${valueInstituto}/courses`,
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        res.data.cursos.forEach((data) => {
          arrayCursos.push({
            value: data.id,
            label: data.nome,
          });
        });
        setCursos(arrayCursos);
        setRequisitionCurso(true);
      });
  }

  function searchCronogramas(valueCurso) {
    setRequisitionCronograma(false);
    const arrayCronogramas = [];
    setCronogramas(arrayCronogramas);
    axios
      .get(`${process.env.REACT_APP_API_URL}/courses/${valueCurso}/timelines`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        res.data.cronogramas.forEach((data) => {
          arrayCronogramas.push({
            id: data.id,
            ano: data.ano,
            semestre: data.semestre,
          });
        });
        setCronogramas(arrayCronogramas);
        setRequisitionCronograma(true);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/timelines/${id}`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          return navigate(0);
        } else {
          alert(res.data.error);
        }
      });
  }

  return (
    <div>
      <Container component="main">
        <div className="mt-3 mt-md-5">
          <Typography
            className="pb-5 pt-2 text-center"
            component="h1"
            variant="h4"
          >
            Cronogramas
          </Typography>
          <div className="d-flex">
            <div className="col-4">
              <InputLabel
                style={{ textAlign: "center" }}
                className={"mt-2"}
                id="label-universidade"
              >
                Selecione a universidade
              </InputLabel>
              <Select
                className={"mt-3"}
                labelId="label-universidade"
                variant="outlined"
                defaultValue=""
                options={universidades}
                fullWidth
                placeholder="Universidade"
                onChange={handleChangeUniversidade}
              />
            </div>

            {requisitionInstituto ? (
              <div className="col-4">
                <InputLabel
                  style={{ textAlign: "center" }}
                  className={"mt-2"}
                  id="label-instituto"
                >
                  Selecione o instituto
                </InputLabel>
                <Select
                  className={"mt-3"}
                  labelId="label-instituto"
                  variant="outlined"
                  defaultValue=""
                  options={institutos}
                  fullWidth
                  placeholder="Instituto"
                  onChange={handleChangeInstituto}
                />
              </div>
            ) : (
              ""
            )}

            {cursos.length !== 0 ? (
              <div className="col-4">
                <InputLabel
                  style={{ textAlign: "center" }}
                  className={"mt-2"}
                  id="label-curso"
                >
                  Selecione o curso
                </InputLabel>
                <Select
                  className={"mt-3"}
                  labelId="label-curso"
                  variant="outlined"
                  defaultValue=""
                  options={cursos}
                  fullWidth
                  placeholder="Curso"
                  onChange={handleChangeCurso}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          {requisitionCronograma ? (
            <>
              <Typography
                className="pb-5 pt-2 text-center mt-5"
                component="h1"
                variant="h4"
              >
                Cronogramas
              </Typography>
              <Accordion defaultActiveKey="">
                {cronogramas.map((cronograma) => (
                  <Accordion.Item eventKey={cronograma.id}>
                    <Accordion.Header>{cronograma.ano}</Accordion.Header>
                    <Accordion.Body>
                      <div className="accordion-div">
                        <div>
                          <p>
                            <strong>Ano:</strong> {cronograma.ano} <br />
                          </p>
                          <p>
                            <strong>Semestre:</strong> {cronograma.semestre}{" "}
                            <br />
                          </p>
                        </div>
                        <div>
                          <button
                            onClick={() =>
                              navigate(`/atividades/${cronograma.id}`)
                            }
                          >
                            <ArticleIcon />
                          </button>
                          {userType === "3" ? (
                            <div>
                              <button
                                onClick={() =>
                                  navigate(`/criar-atividade/${cronograma.id}`)
                                }
                              >
                                <AddIcon />
                              </button>
                              <button
                                onClick={() => handleDelete(cronograma.id)}
                              >
                                <DeleteOutlineIcon />
                              </button>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
}
