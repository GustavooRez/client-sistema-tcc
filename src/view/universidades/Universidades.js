import React, { useState, useCallback } from "react";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Accordion from "react-bootstrap/Accordion";
const axios = require("axios").default;
import "bootstrap/dist/css/bootstrap.min.css";

export default function Universidades() {
  const [universidades, setUniversidades] = useState([]);
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/universities`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setUniversidades(res.data.universidades);
        } 
      });
  }, []);

  function handleDelete(id) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/universities/${id}`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      }).then((res) => {
        if (res.data.status === 200) {
          return navigate(0);
        } else {
          setStatus(res.data.error)
        }
      })
  }

  return (
    <div>
      <Container component="main">
        <div className="mt-3 mt-md-5">
          {universidades.length !== 0 ? (
            <div>
              <Typography className="pb-5 pt-2" component="h1" variant="h4">
                Universidades
              </Typography>
              {status !== true ? (
                <Alert className="my-2" variant="filled" severity={classStatus}>
                  {status}
                </Alert>
                ) : (
                  ""
              )}
              <Accordion defaultActiveKey="">
                {universidades.map((universidade) => (
                  <Accordion.Item eventKey={universidade.id}>
                    <Accordion.Header>{universidade.nome}</Accordion.Header>
                    <Accordion.Body>
                      <div className="accordion-div">
                        <p><strong>Nome:</strong> {universidade.nome} <br/></p>
                        <div>
                          <button onClick={() => navigate(`/editar-universidade/${universidade.id}`)}>
                            <UpdateIcon />
                          </button>
                          <button onClick={() => handleDelete(universidade.id)}>
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
    </div>
  )
}