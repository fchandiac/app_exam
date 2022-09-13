import { React, useState, useEffect } from 'react'
import {useParams, useNavigate } from "react-router-dom";

const books = require('../../services/books')
const config = require('../../config.json')

export default function Actualizar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [bookData, setBookData] = useState(bookDataDefault())
  
  useEffect(() => {
    books.findOneById(id)
    .then(res =>{
      setBookData({
        ...bookData,
        ISBN: res.ISBN,
        nombreLibro: res.nombreLibro,
        editorial: res.editorial,
        paginas: res.paginas,
        portada: res.portada
      })
    })
    .catch(err => {console.error(err)})
  }, [])
  

  const submit = (e) => {
    e.preventDefault()
    books.update(
      id,
      bookData.ISBN,
      bookData.nombreLibro,
      bookData.editorial,
      bookData.portada,
      bookData.paginas
    )
    .then(() => {
      navigate('/libros/listar')
    })
    .catch(err => {console.error(err)})
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={submit}>
          <div className="mb-3 mt-3">
            <label className="form-label">Nombre Libro</label>
            <input type="text" className="form-control" name='nombreLibro'
              value={bookData.nombreLibro}
              onChange={(e) => {
                setBookData({
                  ...bookData, nombreLibro: e.target.value
                })
              }}
              required />
          </div>
          <div className="mb-3">
            <label className="form-label">Editorial</label>
            <input type="text" className="form-control" name='editorial'
              value={bookData.editorial}
              onChange={(e) => {
                setBookData({
                  ...bookData, editorial: e.target.value
                })
              }}
              required />
          </div>
          <div className="mb-3">
            <label className="form-label">Nº de páginas</label>
            <input type={'number'} className="form-control" name='paginas'
              value={bookData.paginas}
              onChange={(e) => {
                setBookData({
                  ...bookData, paginas: e.target.value
                })
              }}
              required />
          </div>
          <div className="mb-3">
            <label className="form-label">ISBN</label>
            <input type={'text'} className="form-control" name='ISBN'
              value={bookData.ISBN}
              onChange={(e) => {
                setBookData({
                  ...bookData, ISBN: e.target.value
                })
              }}
              required />
          </div>
          <div className="mb-3">
            <button className='btn btn-primary' type='submit'>Actualizar</button>
          </div>
        </form>
      </div>
    </>
  )
}

function bookDataDefault() {
  return ({
    ISBN: '',
    nombreLibro: '',
    editorial: '',
    portada: '',
    paginas: 0,
  })
}
