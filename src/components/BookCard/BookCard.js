import React from 'react'
import { useNavigate } from "react-router-dom"

const books = require('../../services/books')

export default function BookCard(props) {
    const {id, ISBN, nombreLibro, editorial, portada, paginas, updateStateBooks, setUpdateStateBooks} = props
    const navigate = useNavigate()

    const destroy = () => {
        books.destroy(id)
        .then(() => {
            updateStateBooks? setUpdateStateBooks(false): setUpdateStateBooks(true)
        })
        .catch(err => {console.error(err)})
    }

    const update = () => {
        let url = '/libros/actualizar/' + id
        navigate(url)
    }
    return (
        <>
            <div className="card m-2" style={{'minWidth':'23rem', 'minHeight': '20rem'}}>
                <div style={{'display': 'flex'}}>
                    <div>
                        <img 
                        src={portada}
                        width="100%"
                        style={{'maxWidth':'10rem'}}
                        />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{nombreLibro}</h5>
                        <p className="card-text" style={{'fontSize':'.7rem'}}>Editorial: {editorial}</p>
                        <p className="card-text" style={{'fontSize':'.7rem'}}>Nº de páginas: {paginas}</p>
                        <p className="card-text" style={{'fontSize':'.7rem'}}>ISBN: {ISBN}</p>
                    </div>

                </div>
                <div className="card-footer" style={{'display': 'flex'}}>
                    <button className='btn btn-danger' onClick={destroy}>Eliminar</button>
                    <button className='btn btn-primary' onClick={update} style={{'marginLeft':'1rem'}}>Actualizar</button>
                </div>
            </div>
        </>
    )
}
