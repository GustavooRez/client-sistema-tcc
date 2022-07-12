import React, { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Accordion from "react-bootstrap/Accordion";
import Typography from "@material-ui/core/Typography";
import Alert from "@mui/material/Alert";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InputLabel from "@material-ui/core/InputLabel";
const axios = require("axios").default;

export default function Atividades() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [atividades, setAtividades] = useState([]);
  const [requisitionAtividade, setRequisitionAtividade] = useState(false);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/timelines/${id}/activities`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        let arrayAtividades = [];
        res.data.atividades.forEach((atividade) => {
          arrayAtividades.push({
            id: atividade.id,
            data: atividade.data,
            titulo: atividade.titulo,
            descricao: atividade.descricao,
          });
        });
        setAtividades(arrayAtividades);
        setRequisitionAtividade(true);
      });
  }, []);

  function handleDelete(id) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/activities/${id}`, {
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
    <Container component="main">
        <div className="mt-3 mt-md-5">
          {console.log(atividades)}
          {atividades.length !== 0 ? (
            <div>
              <Typography className="pb-5 pt-2" component="h1" variant="h4">
                Atividades
              </Typography>
              <Accordion defaultActiveKey="">
                {atividades.map((atividade) => (
                  <Accordion.Item eventKey={atividade.id}>
                    <Accordion.Header>{atividade.titulo}</Accordion.Header>
                    <Accordion.Body>
                      <div className="accordion-div">
                        <div>
                          <p><strong>Título:</strong> {atividade.titulo} <br/></p>
                          <p><strong>Descrição:</strong> {atividade.descricao} <br/></p>
                        </div>
                        <div>
                          <button onClick={() => navigate(`/editar-atividade/${atividade.id}/${id}`)}>
                            <UpdateIcon />
                          </button>
                          <button onClick={() => handleDelete(atividade.id)}>
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
            "oi"
          )}
        </div>
      </Container>
  )
}