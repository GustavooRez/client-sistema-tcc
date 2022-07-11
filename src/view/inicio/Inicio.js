// Neste arquivo é definido a página inicial do sistema
import React from "react";
import Container from "@material-ui/core/Container";

export default function Inicio() {
  return (
    <div>
      <Container>
        <div className="pt-5" style={{ textAlign: "center" }}>
          <h1>Sistema de Gerenciamento de TFG</h1>
        </div>
        <Container>
          <div className="text-center py-3">
            <img
              className="mb-5"
              style={{ width: "20vh" }}
              src={require("../../images/logo.png")}
              alt="logo"
            />
          </div>
          <div style={{ fontSize: "1.2rem"}}>
            <div style={{textAlign: "center",fontSize: "1.4rem"}} className="pt-1 pb-4">Seja bem vindo ao sistema de TFG!</div>
            <div className="py-1">
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
}
