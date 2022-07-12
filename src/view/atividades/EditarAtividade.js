import React, { useState, useCallback } from "react";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useNavigate, useParams } from "react-router-dom";
const axios = require("axios").default;
import "bootstrap/dist/css/bootstrap.min.css";

export default function CriarAtividade() {
  const { id, id_cronograma } = useParams();
  const navigate = useNavigate();
  const [atividade, setAtividade] = useState(false);
  const [inputValues, setInputValues] = useState({
    data: new Date(),
    titulo: "",
    descricao: ""
  });

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/activity/${id}`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setInputValues({
            data: res.data.atividade.data,
            titulo: res.data.atividade.titulo,
            descricao: res.data.atividade.descricao
          })
        }
        setAtividade(true)
      });
  }, [])


  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setInputValues({ ...inputValues, data: date });
  }

  function onSubmit() {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/activities/${id}`,
        {
          data: selectedDate,
          titulo: inputValues.titulo,
          descricao: inputValues.descricao,
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          return navigate(`/atividades/${id_cronograma}`);
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
              Editar Atividade
            </Typography>
            <div className="text-center mt-5">
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
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="titulo"
                  label="Titulo"
                  name="titulo"
                  onChange={handleOnChange}
                  value={atividade !== false ? inputValues.titulo : ""}
                ></TextField>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="descricao"
                  label="Descricao"
                  name="descricao"
                  onChange={handleOnChange}
                  value={atividade !== false ? inputValues.descricao : ""}
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
                  Atualizar
                </Button>
              </div>
        </div>
      </Container>
    </div>
  )
}