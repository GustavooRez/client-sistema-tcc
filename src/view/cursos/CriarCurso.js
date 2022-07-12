import React, { useState, useCallback } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";

export default function CriarCurso() {
  const [universidades, setUniversidades] = useState([]);
  const [institutos, setInstitutos] = useState([]);
  const navigate = useNavigate();
  var [status, setStatus] = useState(true);
  const [requisition, setRequisition] = useState(null);
  const [institutoSelected, setInstitutoSelected] = useState([]);
  const [inputValues, setInputValues] = useState({
    nome: "",
    codigo: ""
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
    setInstitutoSelected(event.value);
  }

  function searchInstitutes(valueUniversidade) {
    setRequisition(false);
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
        setRequisition(true);
      });
  }

  function onSubmit() {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/course`,
        {
          nome: inputValues.nome,
          codigo: inputValues.codigo,
          id_instituto: institutoSelected
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          return navigate("/cursos");
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
              Criar Curso
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
          {requisition ? (
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
            <div className="text-center mt-5">            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              onChange={handleOnChange}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="codigo"
              label="Codigo"
              name="codigo"
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
            </>
                     
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  )
}