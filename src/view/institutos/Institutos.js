import React, { useState, useCallback } from "react";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Accordion from "react-bootstrap/Accordion";
const axios = require("axios").default;
import "bootstrap/dist/css/bootstrap.min.css";

export default function Institutos() {
  const [institutos, setInstitutos] = useState([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/institutes`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setInstitutos(res.data.institutos);
        }
      });
  }, []);

  return (
    <div>
      <Container component="main">
        <div className="mt-3 mt-md-5">
          {institutos.length !== 0 ? (
            <div>
              <Typography className="pb-5 pt-2" component="h1" variant="h4">
                Institutos
              </Typography>
              <Accordion defaultActiveKey="">
                {institutos.map((instituto) => (
                  <Accordion.Item eventKey={instituto.id}>
                    <Accordion.Header>{instituto.nome}</Accordion.Header>
                    <Accordion.Body>
                        <p><strong>Nome:</strong> {instituto.nome} <br/></p>
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