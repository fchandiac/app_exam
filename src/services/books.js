
const config = require('../config.json')
const server_url = config.server_url


function findAll() {
    const books = new Promise((resolve, reject) => {
        fetch(server_url + 'books', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => { reject(err) })
    })
    return books
}

function create(ISBN, nombreLibro, editorial, portada, paginas){
    let data = {ISBN, nombreLibro, editorial, portada, paginas}
    const book = new Promise((resolve, reject) => {
        fetch(server_url + 'books', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => { reject(err) })
    })
    return book
}

function update(id, ISBN, nombreLibro, editorial, portada, paginas){
    let data = {id, ISBN, nombreLibro, editorial, portada, paginas}
    const book = new Promise((resolve, reject) => {
        fetch(server_url + 'books/update', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => { reject(err) })
    })
    return book
}


function destroy(id){
    let data = {id}
    const book = new Promise((resolve, reject) => {
        fetch(server_url + 'books', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => { reject(err) })
    })
    return book
}

function uploadImage(formData) {
    const image = new Promise((resolve, reject) => {
        fetch(server_url + 'books/uploadImage', {
            method: 'POST',
            body: formData,
        }).then(res => {
           res.json().then(data => {
            resolve(data.filename)
        })
        })
        .catch(err => { reject(err) })
    })

    return image
}

function findOneById(id){
    let data = {id}
    const book = new Promise((resolve, reject) => {
        fetch(server_url + 'books/findOneById', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => { reject(err) })
    })
    return book
}

export { findAll, uploadImage, create, findOneById, update, destroy}