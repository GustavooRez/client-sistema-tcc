import React, { useState, useCallback } from "react";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";
const axios = require("axios").default;
import "bootstrap/dist/css/bootstrap.min.css";

export default function CriarCronograma() {
  const [institutos, setInstitutos] = useState([]);
  var [status, setStatus] = useState(true);
  const [universidades, setUniversidades] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cursoSelected, setCursoSelected] = useState(null);
  const [requisitionInstituto, setRequisitionInstituto] = useState(null);
  const [requisitionCurso, setRequisitionCurso] = useState(null);
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    ano: "",
    semestre: ""
  });

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

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  });


  const handleChangeUniversidade = (event) => {
    searchInstitutes(event.value);
  };

  const handleChangeInstituto = (event) => {
    searchCourses(event.value);
  }

  const handleChangeCurso = (event) => {
    setCursoSelected(event.value)
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
            value: data.id,
            label: data.nome,
          });
        });
        setCursos(arrayCursos);
        setRequisitionCurso(true);
      });
  }

  function onSubmit() {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/timeline`,
        {
          ano: inputValues.ano,
          semestre: inputValues.semestre,
          id_curso: cursoSelected
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          return navigate("/cronogramas");
        } else {
          setStatus(res.data.error);
        }
      });
  }

  return (
    <div>
      <Container component="main">
      <div className="mt-3 mt-md-5">
            <Typography className="pb-5 pt-2 text-center" component="h1" variant="h4">
              Criar Cronograma
            </Typography>
            {status !== true ? (
              <Alert className="my-2" variant="filled" severity={classStatus}>
                {status}
              </Alert>
             ) : (
              ""
            )}
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
            {cursos.length !== 0 ? (
            <div>
              <div>
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
                  placeholder="Instituto"
                  onChange={handleChangeCurso}
                />
              </div>
              <div className="text-center mt-5">            
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="ano"
                  label="Ano"
                  name="ano"
                  onChange={handleOnChange}
                ></TextField>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="semestre"
                  label="Semestre"
                  name="semestre"
                  onChange={handleOnChange}
                ></TextField>
                <div
                  className={"mt-3"}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >          
                </div>
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