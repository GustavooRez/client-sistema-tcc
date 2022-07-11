// Neste arquivo é definido a página de criar usuários
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
const axios = require("axios").default;

export default function CriarUsuario() {
  const [inputValues, setInputValues] = useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    codigo: "",
  });
  const [inputValuesProfessor, setInputValuesProfessor] = useState({
    email: "",
  });
  const [userTypeSelect, setUserTypeSelect] = React.useState([]);
  var [status, setStatus] = useState(true);
  var [universidades, setUniversidades] = useState([]);
  var [universidadeSelected, setUniversidadeSelected] = useState([]);
  var [institutos, setInstitutos] = useState([]);
  var [institutoSelected, setInstitutoSelected] = useState([]);
  var [cursos, setCursos] = useState([]);
  var [cursoSelected, setCursoSelected] = useState(undefined);
  var [exibirInstituto, setExibirInstituto] = useState(false);
  var [exibirCurso, setExibirCurso] = useState(false);
  var [classStatus, setClassStatus] = useState("success");
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/universities`, {
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

  const handleOnChangeProfessor = useCallback((event) => {
    const { name, value } = event.target;
    setInputValuesProfessor({ ...inputValuesProfessor, [name]: value });
  });

  const handleSelectUserType = (event) => {
    if (event.value === "professor") {
      document.getElementById("prof_div").style.display = "";
      document.getElementById("admin_div").style.display = "none";
    } else {
      document.getElementById("admin_div").style.display = "";
      document.getElementById("prof_div").style.display = "none";
    }
    setUserTypeSelect(event.value);
  };

  const handleSelectUniversity = (event) => {
    setUniversidadeSelected(event.value);
    setExibirInstituto(false);
    setExibirCurso(false);
    setInstitutoSelected(undefined);
    setCursoSelected(undefined);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/universities/${event.value}/institutes`,
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
          setExibirInstituto(true);
        }
      });
  };

  const handleSelectInstitute = (event) => {
    setExibirCurso(false);
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
          setExibirCurso(true);
        }
      });
  };

  const handleSelectCurso = (event) => {
    setCursoSelected(event.value);
  };

  function onSubmit() {
    if (userTypeSelect === "professor") {
      axios
        .post(`${process.env.REACT_APP_API_URL}/users/create-professor`, {
          perfil_usuario: 2,
          email: inputValuesProfessor.email,
        })
        .then((res) => {
          if (res.data.status === 200) {
            setStatus(
              `O código gerado para a criação do usuário professor foi: ${res.data.codigo}! Também foi enviado o código a este email!`
            );
            setClassStatus("success");
          } else {
            setStatus(res.data.error);
            setClassStatus("error");
          }
        });
    } else if (userTypeSelect === "admin") {
      if(cursoSelected !== undefined){
        axios
          .post(`${process.env.REACT_APP_API_URL}/users`, {
            nome: inputValues.nome,
            telefone: inputValues.telefone,
            email: inputValues.email,
            senha: inputValues.senha,
            perfil_usuario: 3,
            curso: cursoSelected,
          })
          .then((res) => {
            if (res.data.status === 200) {
              return navigate("/");
            } else {
              setStatus(res.data.error);
              setClassStatus("error");
            }
          });
      }else{
        setStatus("Preencha os campos obrigatórios!");
        setClassStatus("error");
      }
    }
  }
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className="mt-3 mt-md-5">
          <div className="text-center">
            <Typography component="h1" variant="h4" className="pb-5 pt-2">
              Criar usuarios
            </Typography>
            {status !== true ? (
              <Alert className="my-2" variant="filled" severity={classStatus}>
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
                { value: "admin", label: "Coordenador" },
                { value: "professor", label: "Professor" },
              ]}
              placeholder="Selecione"
              onChange={handleSelectUserType}
            />
            <div id="prof_div" style={{ display: "none" }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail do professor"
                name="email"
                onChange={handleOnChangeProfessor}
              ></TextField>
            </div>
            <div id="admin_div" style={{ display: "none" }}>
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
            </div>
            <Button
              type="button"
              variant="contained"
              fullWidth
              color="primary"
              size="large"
              className="mb-3 mb-md-4 mt-4"
              onClick={() => onSubmit()}
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
