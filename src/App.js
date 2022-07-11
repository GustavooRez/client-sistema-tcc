// Através deste arquivo é possível realizar o roteamento das páginas
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {RequireAuth,RequireProfessorAccess,RequireAdminAccess,RequireSemTccAccess, RequireMatriculaRealizadaAccess, RequireDesenvolvimentoParcialAccess, RequireDesenvolvimentoFinalAccess,} from "./Private/Private.tsx"

import Login from "./view/login/Login";
import Logout from "./view/login/Logout";
import Inicio from "./view/inicio/Inicio";
import CriarUsuario from "./view/usuario/CriarUsuario";
import EditarUsuario from "./view/usuario/EditarUsuario";
import CriarUsuarios from "./view/usuario/CriarUsuarios";
import CriarPerfilProfessor from "./view/professor/CriarPerfilProfessor";
import Orientadores from "./view/professor/Orientadores";
import CriarProjeto from "./view/projetos/CriarProjeto";
import PerfilProfessor from "./view/professor/PerfilProfessor";
import MatriculaTfg from './view/tfg/MatriculaTfg';
import RegistroTfg from './view/tfg/RegistroTfg';
import AceitarOrientacao from './view/tfg/AceitarOrientacao';
import Projetos from './view/projetos/Projetos';
import CriarUniversidade from "./view/universidades/CriarUniverisade";
import CriarInstituto from "./view/institutos/CriarInstituto";
import EnviarTccParcial from './view/tfg/EnviarTccParcial';
import EnviarTccFinal from './view/tfg/EnviarTccFinal';
import AvaliarTfgParcial from './view/tfg/AvaliarTfgParcial';
import ConfirmarMatricula from './view/tfg/ConfirmarMatricula';
import ConfirmarProjeto from './view/tfg/ConfirmarProjeto';
import StatusTcc from './view/tfg/StatusTcc';
import Navbar from "./components/Navbar";
import "./css/css.css";
import Universidades from "./view/universidades/Universidades";
import Institutos from "./view/institutos/Institutos";
import CriarCurso from "./view/cursos/CriarCurso";
import Cursos from "./view/cursos/Cursos";
import CriarCronograma from "./view/cronogramas/CriarCronograma";
import EditarUniversidade from "./view/universidades/EditarUniversidade";
import EditarInstituto from './view/institutos/EditarInstituto';
import EditarCurso from './view/cursos/EditarCurso';
import Cronogramas from "./view/cronogramas/Cronogramas";
import CriarAtividade from "./view/atividades/CriarAtividade";
import Atividades from "./view/atividades/Atividades";
import EditarAtividade from "./view/atividades/EditarAtividade";
function App() {
  return (
      
    <BrowserRouter>
      <Suspense >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/criar-usuario" element={ <CriarUsuario /> } /> 
          <Route path="/editar-usuario" element={<RequireAuth > <Navbar /> <EditarUsuario /></RequireAuth> } /> 
          <Route path="/criar-usuarios" element={<RequireAuth ><RequireAdminAccess> <Navbar /> <CriarUsuarios /></RequireAdminAccess> </RequireAuth>} /> 
          <Route path="/" element={ <><Navbar /><Inicio /> </> } />
          <Route path="/realizar-matricula" element={ <RequireSemTccAccess> <Navbar /> <MatriculaTfg /> </RequireSemTccAccess>} />
          <Route path="/registro-tfg" element={ <RequireMatriculaRealizadaAccess> <Navbar /> <RegistroTfg /> </RequireMatriculaRealizadaAccess>} />
          <Route path="/enviar-tcc-parcial" element={ <RequireDesenvolvimentoParcialAccess> <Navbar /> <EnviarTccParcial /> </RequireDesenvolvimentoParcialAccess> } />
          <Route path="/enviar-tcc-final" element={ <RequireDesenvolvimentoFinalAccess> <Navbar /> <EnviarTccFinal /> </RequireDesenvolvimentoFinalAccess> } />
          <Route path="/criar-perfil-professor" element={ <RequireProfessorAccess> <Navbar /> <CriarPerfilProfessor /> </RequireProfessorAccess> } />
          <Route path="/criar-projeto" element={ <RequireProfessorAccess> <Navbar /> <CriarProjeto /> </RequireProfessorAccess> } />
          <Route path="/projetos" element={ <RequireAuth> <Navbar /> <Projetos /> </RequireAuth> } />
          <Route path="/criar-universidade" element={ <RequireAdminAccess> <Navbar /> <CriarUniversidade /> </RequireAdminAccess> } />
          <Route path="/editar-universidade/:id" element={ <RequireAdminAccess> <Navbar /> <EditarUniversidade /> </RequireAdminAccess> } />
          <Route path="/editar-instituto/:id" element={ <RequireAdminAccess> <Navbar /> <EditarInstituto /> </RequireAdminAccess> } />
          <Route path="/editar-curso/:id" element={ <RequireAdminAccess> <Navbar /> <EditarCurso /> </RequireAdminAccess> } />
          <Route path="/criar-atividade/:id" element={ <RequireAdminAccess> <Navbar /> <CriarAtividade /> </RequireAdminAccess> } />
          <Route path="/criar-instituto" element={ <RequireAdminAccess> <Navbar /> <CriarInstituto /> </RequireAdminAccess> } />
          <Route path="/criar-curso" element={ <RequireAdminAccess> <Navbar /> <CriarCurso /> </RequireAdminAccess> } />
          <Route path="/criar-cronograma" element={ <RequireAdminAccess> <Navbar /> <CriarCronograma /> </RequireAdminAccess> } />
          <Route path="/criar-atividade" element={ <RequireAdminAccess> <Navbar /> <CriarAtividade /> </RequireAdminAccess> } />
          <Route path="/cronogramas" element={ <RequireAdminAccess> <Navbar /> <Cronogramas /> </RequireAdminAccess> } />
          <Route path="/atividades/:id" element={ <RequireAdminAccess> <Navbar /> <Atividades /> </RequireAdminAccess> } />
          <Route path="/editar-atividade/:id/:id_cronograma" element={ <RequireAdminAccess> <Navbar /> <EditarAtividade /> </RequireAdminAccess> } />
          <Route path="/cursos" element={ <RequireAdminAccess> <Navbar /> <Cursos /> </RequireAdminAccess> } />
          <Route path="/universidades" element={ <RequireAdminAccess> <Navbar /> <Universidades /> </RequireAdminAccess> } />
          <Route path="/institutos" element={ <RequireAdminAccess> <Navbar /> <Institutos /> </RequireAdminAccess> } />
          <Route path="/orientadores" element={ <RequireAuth> <Navbar /> <Orientadores /> </RequireAuth> } />
          <Route path="/perfil-professor/:id" element={ <RequireAuth> <Navbar /> <PerfilProfessor /> </RequireAuth> } />
          <Route path="/aceitar-orientacao" element={ <RequireProfessorAccess> <Navbar /> <AceitarOrientacao /> </RequireProfessorAccess> } />
          <Route path="/avaliar-tcc-parcial" element={ <RequireProfessorAccess> <Navbar /> <AvaliarTfgParcial /> </RequireProfessorAccess> } />
          <Route path="/confirmar-matricula" element={ <RequireAdminAccess> <Navbar /> <ConfirmarMatricula /> </RequireAdminAccess> } />
          <Route path="/confirmar-projeto" element={ <RequireAdminAccess> <Navbar /> <ConfirmarProjeto /> </RequireAdminAccess> } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
