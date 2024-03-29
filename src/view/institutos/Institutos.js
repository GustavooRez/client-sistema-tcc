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

export default function Institutos() {
  const [institutos, setInstitutos] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  let [requisition, setRequisition] = React.useState();
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
            id: data.id,
            nome: data.nome,
          });
        });
        setInstitutos(arrayInstitutos);
        setRequisition(true);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/institutes/${id}`, {
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
          {institutos.length !== 0 ? (
            <div>
              <Typography className="pb-5 pt-2 mt-5" component="h1" variant="h4">
                Institutos
              </Typography>
              <Accordion defaultActiveKey="">
                {institutos.map((instituto) => (
                  <Accordion.Item eventKey={instituto.id}>
                    <Accordion.Header>{instituto.nome}</Accordion.Header>
                    <Accordion.Body>
                        <div className="accordion-div">
                        <p><strong>Nome:</strong> {instituto.nome} <br/></p>
                        <div>
                          <button onClick={() => navigate(`/editar-instituto/${instituto.id}`)}>
                            <UpdateIcon />
                          </button>
                          <button onClick={() => handleDelete(instituto.id)}>
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
        </div>
      </Container>
    </div>
  )
}