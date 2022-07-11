// Neste arquivo é definido a página de Projetos
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@mui/material/Alert";
import Link from "@material-ui/core/Link";
import Accordion from "react-bootstrap/Accordion";
const axios = require("axios").default;
import "bootstrap/dist/css/bootstrap.min.css";

function Projetos() {
  const [projetosDisponiveis, setProjetosDisponiveis] = useState([]);
  const [projetosNaoDisponiveis, setProjetosNaoDisponiveis] = useState([]);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setProjetosDisponiveis(res.data.projetosDisponiveis);
          setProjetosNaoDisponiveis(res.data.projetosNaoDisponiveis);
        }
      });
  }, []);
  return (
    <div>
      <Container component="main">
        <div className="mt-3 mt-md-5">
          {projetosDisponiveis.length !== 0 ? (
            <div>
              <Typography className="pb-5 pt-2" component="h1" variant="h4">
                Projetos disponíveis
              </Typography>
              <Accordion defaultActiveKey="">
                {projetosDisponiveis.map((projeto) => (
                  <Accordion.Item eventKey={projeto.id}>
                    <Accordion.Header>{projeto.titulo}</Accordion.Header>
                    <Accordion.Body>
                        <p><strong>Descrição:</strong> {projeto.descricao} <br/></p>
                        <p><strong>Pré Requisitos:</strong> {projeto.pre_requisito}<br/></p>
                        <p><strong>Professor:</strong> <Link href={`/perfil-professor/${projeto.perfil_professor.id}`}>{projeto.perfil_professor.usuario.nome}</Link></p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="mt-3 mt-md-5">
          {projetosNaoDisponiveis.length !== 0 ? (
            <div>
              <Typography className="pb-5 pt-2" component="h1" variant="h4">
                Projetos não disponíveis
              </Typography>
              <Accordion defaultActiveKey="">
                {projetosNaoDisponiveis.map((projeto) => (
                  <Accordion.Item eventKey={projeto.id}>
                    <Accordion.Header>{projeto.titulo}</Accordion.Header>
                    <Accordion.Body>
                        <p><strong>Descrição:</strong> {projeto.descricao} <br/></p>
                        <p><strong>Pré Requisitos:</strong> {projeto.pre_requisito}<br/></p>
                        <p><strong>Professor:</strong> <Link href={`/perfil-professor/${projeto.perfil_professor.id}`}>{projeto.perfil_professor.usuario.nome}</Link></p>
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
  );
}

export default Projetos;
