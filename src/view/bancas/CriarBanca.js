// Neste arquivo é definido a página de Enviar Matrícula do Tcc
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Alert from "@mui/material/Alert";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "react-select";
import axios from "axios";

export default function CriarBanca() {
  const [professores, setProfessores] = useState([]);
  const [professores1, setProfessores1] = useState([]);
  const [professores2, setProfessores2] = useState([]);
  const [idOrientador, setIdOrientador] = useState(null);
  const idTcc = localStorage.getItem("userTccId");
  const [orientadorSelected, setOrientadorSelected] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [coorientadorSelected, setCoorientadorSelected] = useState(null);
  var [status, setStatus] = useState(true);
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    dia_horario: new Date(),
  });


  React.useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/type`,
        { perfil_usuario: 2 },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((profs) => {
        let arrayProfessores = [];
        let arrayProfessores2 = [];
        profs.data.forEach((prof) => {
          arrayProfessores.push({
            value: prof.id,
            label: prof.nome,
          });
          arrayProfessores2.push({
            value: prof.id,
            label: prof.nome,
          });
        });
        setProfessores(arrayProfessores);
        setProfessores1(arrayProfessores);
        setProfessores2(arrayProfessores2);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/tfg/search-orientador-id/${idTcc}`,
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        setIdOrientador(res.data.resultsTfg[0].id);
      });
  }, []);




  const handleDateChange = (date) => {
    setSelectedDate(date);
    setInputValues({ ...inputValues, dia_horario: date });
  }

  const handleChangeOrientador = (event) => {
    const filtered = professores.filter((prof) => {
      return prof.value !== event.value;
    });
    setProfessores2(filtered);
    setOrientadorSelected(event.value);
  };

  const handleChangeCoorientador = (event) => {
    const filtered = professores.filter((prof) => {
      return prof.value !== event.value;
    });
    setProfessores1(filtered);
    setCoorientadorSelected(event.value);
  };

  function onSubmit() {
    axios
      .get(
          `${process.env.REACT_APP_API_URL}/tfg/search-orientador-id/${idTcc}`,
            {
              headers: {
                Authorization: localStorage.getItem("accesstoken"),
              },
            }
        )
          .then((res) => {
            if (res.data.status === 200) {
              if (orientadorSelected !== null && coorientadorSelected !== null) {
                axios
                  .post(
                    `${process.env.REACT_APP_API_URL}/board`,
                    {
                      id_usuario: idOrientador,
                      id_tfg: idTcc,
                      dia_horario: inputValues.dia_horario,
                      nota_final: "",
                      nota_apresentacao: "",
                      nota_trabalho: ""
                    },
                    {
                      headers: {
                        Authorization: localStorage.getItem("accesstoken"),
                      },
                    }
                  )
                  .then((response) => {
                    if (response.data.status === 200) {
                      let idProfessor1 = orientadorSelected;
                      axios
                        .post(
                          `${process.env.REACT_APP_API_URL}/board`,
                          {
                            id_usuario: idProfessor1,
                            id_tfg: idTcc,
                            dia_horario: inputValues.dia_horario,
                            nota_final: "",
                            nota_apresentacao: "",
                            nota_trabalho: ""
                          },
                          {
                            headers: {
                              Authorization: localStorage.getItem("accesstoken"),
                            },
                          }
                        )
                        .then((response) => {});
                        let idProfessor2 = coorientadorSelected;
                        axios
                          .post(
                          `${process.env.REACT_APP_API_URL}/board`,
                          {
                            id_usuario: idProfessor2,
                            id_tfg: idTcc,
                            dia_horario: inputValues.dia_horario,
                            nota_final: "",
                            nota_apresentacao: "",
                            nota_trabalho: ""
                          },
                          {
                            headers: {
                              Authorization: localStorage.getItem("accesstoken"),
                            },
                          }
                        )
                        .then((response) => {});
                            localStorage.setItem("userTccStatus", "banca_marcada")
                          return navigate("/");
                        } else {
                          setStatus(response.data.error);
                        }
                      });
                  } else {
                    setStatus("Professores precisam ser selecionados");
                  } 
                } else {
              return;
            }
          })
        
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className="mt-3 mt-md-5">
        <div className="text-center">
          <Typography className="pb-5 pt-2" component="h1" variant="h4">
            Registrar Banca
          </Typography>
          {status !== true ? (
              <Alert className="mt-2 mb-4" variant="filled" severity="error">
                {status}
              </Alert>
            ) : (
              ""
            )}
          <div className="imc_div">
            <InputLabel>Selecione os Professores que farão parte da banca</InputLabel>
            <Select
              className={"mt-3"}
              labelId="label-tipo-usuario"
              options={professores1}
              placeholder="Professor Orientador"
              onChange={handleChangeOrientador}
            />
          </div>
          <div className="imc_div">
              <Select
                className={"mt-3"}
                labelId="label-tipo-usuario"
                options={professores2}
                placeholder="Professor Coorientador"
                onChange={handleChangeCoorientador}
              />
          </div>
          <div
            className={"mt-3"}
            style={{
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                className="mt-2"
                autoOk
                required
                fullWidth
                variant="inline"
                inputVariant="outlined"
                label="Data"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>  
          </div>
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
          Marcar
        </Button>
      </div>
    </Container>
  );
}
