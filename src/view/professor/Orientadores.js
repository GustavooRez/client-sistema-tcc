// Neste arquivo é definido a página de Orientadores
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@material-ui/core/Container";
const axios = require("axios").default;

function Orientadores() {
  const navigate = useNavigate();
  const [orientadores, setOrientadores] = useState([]);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/professors`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setOrientadores(res.data.perfilProfessor);
        }
      });
  }, []);

  function MouseOver(event) {
    event.target.style.cursor = "pointer";
  }

  return (
    <div>
      <Container component="main">
        <div className="row p-2">
          {orientadores.map((orientador) => (
            <div
              className="p-1 col-4"
              onMouseOver={MouseOver}
              onClick={() => navigate(`/perfil-professor/${orientador.id}`)}
            >
              <div className="card boxItens" style={{borderRadius: "10px"}}>
                <div className="card-body text-center">
                  <h5 className="card-title">{orientador.usuario.nome}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Orientadores;
