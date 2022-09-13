import { React, useState } from 'react'
import { useNavigate } from "react-router-dom"

const books = require('../../services/books')
const config = require('../../config.json')

export default function Nuevo() {
  const navigate = useNavigate()
  const [bookData, setBookData] = useState(bookDataDefault())
  const [selectedFile, setSelectedFile] = useState(null)


  const handleFileSelected = (e) => {
    e.preventDefault()
    setSelectedFile(e.target.files[0])
  }

  const submit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', selectedFile)
    books.uploadImage(formData)
    .then(img => {
      let url = config.images_path + img
      books.create(
        bookData.ISBN,
        bookData.nombreLibro,
        bookData.editorial,
        url,
        bookData.paginas
      )
      .then(() => {
        navigate('/libros/listar')
      })
      .catch(err => {console.error(err)})
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
            <label className="form-label">Portada</label>
            <br></br>
            <input
            className='form-control'
              accept="image/*"
              id="raised-button-file"
              onChange={handleFileSelected}
              type="file"
            />
          </div>
          <div className="mb-3">
            <button className='btn btn-primary' type='submit'>Enviar</button>
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

