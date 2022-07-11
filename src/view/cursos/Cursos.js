/* eslint-disable no-const-assign */
import React, { useState, useCallback } from "react";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Typography from "@material-ui/core/Typography";
import Accordion from "react-bootstrap/Accordion";
const axios = require("axios").default;
import "bootstrap/dist/css/bootstrap.min.css";

export default function Cursos() {
  const [institutos, setInstitutos] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [requisitionInstituto, setRequisitionInstituto] = useState(null);
  const [requisitionCurso, setRequisitionCurso] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.
      get(`${process.env.REACT_APP_API_URL}/universities`,
      {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      }
    )
    .then((unis) => {
        let arrayUniversidades = [];
        unis.data.universidades.forEach((uni) => {
          arrayUniversidades.push({
            value: uni.id,
            label: uni.nome,
          });
        });
        setUniversidades(arrayUniversidades);
    })
  }, []);

  const handleChangeUniversidade = (event) => {
    searchInstitutes(event.value);
  };

  const handleChangeInstituto = (event) => {
    searchCourses(event.value);
  }

  function searchInstitutes(valueUniversidade) {
    setRequisitionInstituto(false);
    const arrayInstitutos = [];
    setInstitutos(arrayInstitutos);
    axios
      .get(`${process.env.REACT_APP_API_URL}/universities/${valueUniversidade}/institutes`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
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
      .get(`${process.env.REACT_APP_API_URL}/institute/${valueInstituto}/courses`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        res.data.cursos.forEach((data) => {
          arrayCursos.push({
            id: data.id,
            nome: data.nome,
            codigo: data.codigo
          });
        });
        setCursos(arrayCursos);
        setRequisitionCurso(true);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/courses/${id}`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      }).then((res) => {
        if (res.data.status === 200) {
          return navigate(0);
        } else {
          Alert(res.data.error)
        }
      })
  }
  return (
    <div>
      <Container component="main">
      <div className="mt-3 mt-md-5">
            <Typography className="pb-5 pt-2 text-center" component="h1" variant="h4">
              Cursos
            </Typography>
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
          {requisitionInstituto ? (
            <>
            <div>
              <InputLabel
              style={{ textAlign: "center" }}
              className={"mt-4"}
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
            {cursos.length !== 0 ? (
            <div>
              <Typography className="pb-5 pt-2 mt-3" component="h1" variant="h4">
                Cursos
              </Typography>
              <Accordion defaultActiveKey="">
                {cursos.map((curso) => (
                  <Accordion.Item eventKey={curso.id}>
                    <Accordion.Header>{curso.nome}</Accordion.Header>
                    <Accordion.Body>
                      <div className="accordion-div">
                          <div>
                            <p><strong>Nome:</strong> {curso.nome} <br/></p>
                            <p><strong>Codigo:</strong> {curso.codigo} <br/></p>
                          </div>
                          <div>
                            <button onClick={() => navigate(`/editar-curso/${curso.id}`)}>
                              <UpdateIcon />
                            </button>
                            <button onClick={() => handleDelete(curso.id)}>
                              <DeleteOutlineIcon />
                            </button>
                          </div>
                        </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          ) : (
            ""
          )}
            </>
                     
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  )
}