// Neste arquivo é definido a navbar do sistema e seus componentes
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { NavDropdown } from "react-bootstrap";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
const axios = require("axios").default;

export default function Navbar() {
  var [auth, setAuth] = useState(false);
  var userType = localStorage.getItem("usertype");
  const idUsuario = localStorage.getItem("userId");
  var [userTccStatus, setUserTccStatus] = useState(null);
  React.useEffect(() => {
    var token = localStorage.getItem("accesstoken");
    if (!token) {
      setAuth(false);
    } else {
      setAuth(true);
    }

    if (userType === "1") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/check/${idUsuario}`)
        .then((response) => {
          if (response.data.code === 200) {
            setUserTccStatus(response.data.status);
            localStorage.setItem("userTccStatus", response.data.status);
            localStorage.setItem("userTccId", response.data.id);
          } else {
            setUserTccStatus("sem_tcc");
            localStorage.setItem("userTccStatus", "sem_tcc");
          }
        });
    }
  }, []);

  return (
    <>
      <Nav>
        <NavLink to="/">
          <img
            style={{ width: "10vh" }}
            src={require("../images/logocompleto.png")}
            alt="Logo TFG"
          />
        </NavLink>
        <Bars />
        {auth === true ? (
          <NavMenu>
            {userType === "1" && userTccStatus !== null ? (
              <>
                <NavDropdown title="Meu TFG">
                  {(() => {
                    switch (userTccStatus) {
                      case "matricula_aprovada":
                        return (
                          <NavDropdown.Item href="/registro-tfg">
                            Registro de Tfg
                          </NavDropdown.Item>
                        );
                      case "desenvolvimento_parcial":
                        return (
                          <NavDropdown.Item href="/enviar-tcc-parcial">
                            Enviar TCC Parcial
                          </NavDropdown.Item>
                        );
                      case "desenvolvimento_final":
                        return (
                          <NavDropdown.Item href="/enviar-tcc-final">
                            Enviar TCC Final
                          </NavDropdown.Item>
                        );
                      case "sem_tcc":
                        return (
                          <NavDropdown.Item href="/realizar-matricula">
                            Realizar Matrícula
                          </NavDropdown.Item>
                        );
                      default:
                        return (
                          <NavDropdown.Item href="/status-tcc">
                            Status TCC
                          </NavDropdown.Item>
                        );
                    }
                  })()}
                </NavDropdown>
              </>
            ) : (
              ""
            )}
            {userType !== "1" ? (
              <NavDropdown title="Gerenciar TCCs" className="dropdownNav">
                {userType === "3" ? (
                  <>
                    <NavDropdown.Item href="/confirmar-matricula">
                      Confirmar matrícula
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/confirmar-projeto">
                      Confirmar registro
                    </NavDropdown.Item>
                  </>
                ) : (
                  ""
                )}
                <NavDropdown.Item href="/aceitar-orientacao">
                  Aceitar Orientação
                </NavDropdown.Item>
                <NavDropdown.Item href="/avaliar-tcc-parcial">
                  Avaliar TCC Parcial
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              ""
            )}
            <NavDropdown title="Projetos" className="dropdownNav">
              <>
                {userType !== "1" ? (
                  <>
                    <NavDropdown.Item href="/perfil-professor">
                      Perfil professor
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/criar-projeto">
                      Criar Projeto
                    </NavDropdown.Item>
                  </>
                ) : (
                  ""
                )}
                <NavDropdown.Item href="/orientadores">
                  Orientadores
                </NavDropdown.Item>
                <NavDropdown.Item href="/projetos">Projetos</NavDropdown.Item>
              </>
            </NavDropdown>
            {userType === "3" ? (
              <NavDropdown title="Cronograma" className="dropdownNav">
                <NavDropdown.Item href="/criar-cronograma">
                  Criar cronograma
                </NavDropdown.Item>
                <NavDropdown.Item href="/cronograma">
                  Visualizar cronograma
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavLink to="/cronograma">Cronograma</NavLink>
            )}
            {userType === "3" ? (
              <>
                <NavDropdown title="Gerencial" className="dropdownNav">
                  <NavDropdown.Item href="/criar-usuarios">
                    Criar usuarios
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/criar-universidade">
                    Criar universidade
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/universidades">
                    Visualizar universidades
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/criar-instituto">
                    Criar institutos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/institutos">
                    Visualizar institutos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/criar-curso">
                    Criar curso
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/cursos">
                    Visualizar cursos
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              ""
            )}
            {userType === "3" ? (
              <>
                <NavDropdown title="Template" className="dropdownNav">
                  <NavDropdown.Item href="/criar-template">
                    Criar template
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/template">
                    Visualizar template
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <NavLink to="/template">Template</NavLink>
            )}
          </NavMenu>
        ) : (
          ""
        )}
        <NavBtn>
          {auth === false ? (
            <NavBtnLink to="/login">Fazer login</NavBtnLink>
          ) : (
            <Dropdown>
              <Dropdown.Toggle
                className="backgroundcolor1"
                style={{ color: "white", borderColor: "white" }}
                id="dropdown-basic"
              >
                Olá, {localStorage.getItem("username")}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/editar-usuario">
                  Editar usuário
                </Dropdown.Item>
                <Dropdown.Item href="/logout">Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </NavBtn>
      </Nav>
    </>
  );
}
