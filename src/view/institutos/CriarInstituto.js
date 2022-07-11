import React, { useState, useCallback } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";

export default function CriarInstituto() {
  const [universidades, setUniversidades] = useState([]);
  const [requisicao, setRequisicao] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [universidadeSelected, setUniversidadeSelected] = useState(null);
  var [status, setStatus] = useState(true);
  const [inputValues, setInputValues] = useState({
    nome: ""
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
        setRequisicao(true);
        console.log(arrayUniversidades);
    })
  }, []);

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  });

  const handleChangeUniversidades = (event) => {
    setUniversidadeSelected(event.value);
  };

  function onSubmit() {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/institute`,
        {
          nome: inputValues.nome,
          id_universidade: universidadeSelected
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          return navigate("/universidades");
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
              Criar Instituo
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
              id="nome"
              label="Nome"
              name="nome"
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
              onChange={handleChangeUniversidades}
            />
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
  )
}