import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

import Inicio from './components/Inicio'
import Listar from './components/Listar'
import Nuevo from './components/Nuevo'
import Actualizar from './components/Actualizar'


export default function App() {
  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Librería</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link" href="/">Home</a>
                <a className="nav-link" href="/libros/nuevo">Nuevo libro</a>
                <a className="nav-link" href="/libros/listar">lista de libros</a>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/libros/listar" element={<Listar />} />
          <Route path="/libros/nuevo" element={<Nuevo />} />
          <Route path="/libros/actualizar/:id" element={<Actualizar />} />
          <Route path="/" element={<Inicio />} />
        </Routes>
      </Router>
    </>
  )
}
