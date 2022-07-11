// Neste arquivo é definido a página de Criar usuário
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@material-ui/core/Container";
import "date-fns";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Select from "react-select";
import InputLabel from "@material-ui/core/InputLabel";
import Alert from "@mui/material/Alert";
import Link from "@material-ui/core/Link";
const axios = require("axios").default;

export default function CriarUsuario() {
  const [inputValues, setInputValues] = useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    codigo: "",
  });
  const [userTypeSelect, setUserTypeSelect] = React.useState([]);
  var [universidades, setUniversidades] = useState([]);
  var [universidadeSelected, setUniversidadeSelected] = useState([]);
  var [institutos, setInstitutos] = useState([]);
  var [institutoSelected, setInstitutoSelected] = useState([]);
  var [cursos, setCursos] = useState([]);
  var [cursoSelected, setCursoSelected] = useState(undefined);
  var [status, setStatus] = useState(true);
  var [exibirInstituto, setExibirInstituto] = useState(false);
  var [exibirCurso, setExibirCurso] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/universitys`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((datas) => {
        universidades.length = 0;
        if (datas.data.status === 200) {
          datas.data.universidades.forEach((data) => {
            universidades.push({
              value: data.id,
              label: data.nome,
            });
          });
          setUniversidades(universidades);
        }
      });
  }, []);

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  });

  const handleSelectUserType = (event) => {
    switch (event.value) {
      case 1:
        document.getElementById("aluno_div").style.display = "";
        document.getElementById("professor_div").style.display = "none";
        break;

      case 2:
        document.getElementById("professor_div").style.display = "";
        document.getElementById("aluno_div").style.display = "none";
        break;

      default:
        break;
    }
    setUserTypeSelect(event.value);
  };

  const handleSelectUniversity = (event) => {
    setUniversidadeSelected(event.value);
    setExibirInstituto(false)
    setExibirCurso(false)
    setInstitutoSelected(undefined);
    setCursoSelected(undefined);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/universitys/${event.value}/institutes`,
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((datas) => {
        institutos.length = 0;
        if (datas.data.status === 200) {
          datas.data.institutos.forEach((data) => {
            institutos.push({
              value: data.id,
              label: data.nome,
            });
          });
          setInstitutos(institutos);
          setExibirInstituto(true)
        }
      });
  };

  const handleSelectInstitute = (event) => {
    setExibirCurso(false)
    setCursoSelected(undefined);
    setInstitutoSelected(event.value);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/institute/${event.value}/courses`,
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((datas) => {
        cursos.length = 0;
        if (datas.data.status === 200) {
          datas.data.cursos.forEach((data) => {
            cursos.push({
              value: data.id,
              label: data.nome,
            });
          });
          setCursos(cursos);
          setExibirCurso(true)
        }
      });
  };

  const handleSelectCurso = (event) => {
    setCursoSelected(event.value);
  };

  function onSubmit() {
    if(cursoSelected !== undefined){
      axios
        .post(`${process.env.REACT_APP_API_URL}/users`, {
          nome: inputValues.nome,
          telefone: inputValues.telefone,
          email: inputValues.email,
          senha: inputValues.senha,
          perfil_usuario: userTypeSelect,
          curso: cursoSelected,
          numero: inputValues.numero,
          codigo: inputValues.codigo,
        })
        .then((res) => {
          if (res.data.status === 200) {
            localStorage.setItem("userTccStatus", "sem_tcc");
            localStorage.setItem("accesstoken", res.data.accesstoken);
            localStorage.setItem("userId", res.data.usuario.id);
            localStorage.setItem("username", res.data.usuario.nome);
            localStorage.setItem(
              "usertype",
              parseInt(res.data.usuario.id_perfil_usuario)
            );
            return navigate("/");
          } else {
            setStatus(res.data.error);
          }
        });
    }
  }
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className="mt-3 mt-md-5">
          <div className="text-center">
            <Typography className="pb-5 pt-2" component="h1" variant="h4">
              Criar usuario
            </Typography>
            {status !== true ? (
              <Alert className="my-2" variant="filled" severity="error">
                {status}
              </Alert>
            ) : (
              ""
            )}
            <InputLabel
              style={{ textAlign: "left" }}
              className={"mt-3"}
              id="label-tipo-usuario"
            >
              Tipo usuário
            </InputLabel>
            <Select
              labelId="label-tipo-usuario"
              options={[
                { value: 1, label: "Estudante" },
                { value: 2, label: "Professor" },
              ]}
              placeholder="Selecione"
              onChange={handleSelectUserType}
            />
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
              id="telefone"
              label="Telefone"
              name="telefone"
              onChange={handleOnChange}
            ></TextField>
            <div style={{ display: "none" }} id="professor_div">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="numeroprofessor"
                label="Número"
                name="numero"
                onChange={handleOnChange}
              ></TextField>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="codigo"
                label="Código"
                name="codigo"
                onChange={handleOnChange}
              ></TextField>
            </div>
            <div style={{ display: "none" }} id="aluno_div">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="numeromatricula"
                label="Número de matrícula"
                name="numero"
                onChange={handleOnChange}
              ></TextField>
            </div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              type="email"
              onChange={handleOnChange}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="senha"
              label="Senha"
              name="senha"
              type="password"
              onChange={handleOnChange}
            ></TextField>
            <InputLabel
              style={{ textAlign: "left" }}
              className={"mt-3"}
              id="label-curso"
            >
              Universidade
            </InputLabel>
            <Select
              labelId="label-curso"
              options={universidades}
              placeholder="Selecione"
              onChange={handleSelectUniversity}
            />
            {exibirInstituto === true ? (
              <>
                <InputLabel
                  style={{ textAlign: "left" }}
                  className={"mt-3"}
                  id="label-curso"
                >
                  Instituto
                </InputLabel>
                <Select
                  labelId="label-curso"
                  options={institutos}
                  placeholder="Selecione"
                  onChange={handleSelectInstitute}
                />
              </>
            ) : (
              ""
            )}
            {exibirCurso === true ? (
              <>
                <InputLabel
                  style={{ textAlign: "left" }}
                  className={"mt-3"}
                  id="label-curso"
                >
                  Curso
                </InputLabel>
                <Select
                  labelId="label-curso"
                  options={cursos}
                  placeholder="Selecione"
                  onChange={handleSelectCurso}
                />
              </>
            ) : (
              ""
            )}
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
            <Link href="/login">
              <Button
                type="button"
                variant="contained"
                fullWidth
                color="secondary"
                size="large"
                className="mb-3 mb-md-4 mt-2 backgroundcolor4"
              >
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
