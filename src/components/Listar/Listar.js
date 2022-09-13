import { React, useState, useEffect } from 'react'
import BookCard from '../BookCard/BookCard'
const books = require('../../services/books')
export default function Listar() {
  const [booksList, setBooksList] = useState([])
  const [updateState, setUpdateState] = useState(false)
  useEffect(() => {
    books.findAll()
      .then(res => {
        setBooksList(res)
      })
      .catch(err => { console.error(err) })
  }, [updateState])

  return (
    <>
      <div className='container'>
        <h2 className='mt-3'>
          Todos los libros
        </h2>
        <div className='container' >
          <div className='row'>
            {booksList.map(item => (
              <div key={item._id} className='col'>
                <BookCard
                  id={item._id}
                  ISBN={item.ISBN}
                  nombreLibro={item.nombreLibro}
                  editorial={item.editorial}
                  portada={item.portada}
                  paginas={item.paginas}
                  updateStateBooks={updateState}
                  setUpdateStateBooks={setUpdateState}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
