// Através deste elemento é possível realizar o controle das rotas privadas
import React from "react";
import { Navigate } from "react-router-dom";

export function RequireAuth({ children }: { children: JSX.Element }) {
  var user = localStorage.getItem('accesstoken')
  let auth;
  if (!user) {
    auth = false
  } else {
    auth = true
  }

  if (auth === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export function RequireProfessorAccess({ children }: { children: JSX.Element }) {
  var usertype = localStorage.getItem('usertype')
  let access;
  if (usertype === "2" || usertype === "3") {
    access = true
  } else {
    access = false
  }
  if (access === false) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export function RequireAdminAccess({ children }: { children: JSX.Element }) {
  var usertype = localStorage.getItem('usertype')
  let access;
  if (usertype === "3") {
    access = true
  } else {
    access = false
  }

  if (access === false) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export function RequireSemTccAccess({ children }: { children: JSX.Element }) {
  var userTccStatus = localStorage.getItem('userTccStatus')
  let access;
  if (userTccStatus === "sem_tcc") {
    access = true
  } else {
    access = false
  }
  if (access === false) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export function RequireMatriculaRealizadaAccess({ children }: { children: JSX.Element }) {
  var userTccStatus = localStorage.getItem('userTccStatus');
  let access;
  if (userTccStatus === "matricula_aprovada") {
    access = true
  } else {
    access = false
  }
  if (access === false) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export function RequireDesenvolvimentoParcialAccess({ children }: { children: JSX.Element }) {
  var userTccStatus = localStorage.getItem('userTccStatus');
  let access;
  if (userTccStatus === "registro_de_projeto_aprovado") {
    access = true
  } else {
    access = false
  }
  if (access === false) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export function RequireDesenvolvimentoFinalAccess({ children }: { children: JSX.Element }) {
  var userTccStatus = localStorage.getItem('userTccStatus');
  let access;
  if (userTccStatus === "tfg_parcial_aprovado") {
    access = true
  } else {
    access = false
  }
  if (access === false) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export function RequireTfgFinalEnviadoAccess({ children }: { children: JSX.Element }) {
  var userTccStatus = localStorage.getItem('userTccStatus');
  let access;
  if (userTccStatus === "tfg_final_enviado") {
    access = true
  } else {
    access = false
  }
  if (access === false) {
    return <Navigate to="/" replace />;
  }

  return children;
}
