const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];


// Read
app.get('/', (req, res) => {
    res.redirect('/usuarios')
})

app.get('/usuarios/json', (req, res) => {
    res.json(usuarios)
})

app.get('/usuarios', (req, res) => {
    res.send(`
    <h1>Lista de usuarios</h1>
        <ul>
        ${usuarios.map(usuario => `<li> ID: ${usuario.id} | <b>Nombre:</b> ${usuario.nombre} | <b>Edad:</b> ${usuario.edad} | <b>Procedencia:</b> ${usuario.lugarProcedencia}</li>`)
            .join('')}
        </ul>
        </br>
        <form action="/usuarios" method="post">
            <h3>Añadir nuevo usuario</h3>
            <label for="nombre">Nombre: </label>
            <input type="text" id="nombre" name="nombre" required>
            </br>
            <label for="edad">Edad: </label>
            <input type="number" id="edad" name="edad" required>
            </br>
            <label for="procedencia">Lugar de procedencia: </label>
            <input type="text" id="procedencia" name="procedencia" required>
            </br></br>
            <button type="submit">Agregar usuario</button>
        </form>
        <a href="/usuarios/json">json</a>`)
})

app.get('/usuarios/:nombre', (req, res) => {
    const usuarioEncontrado = usuarios.find(usuario => usuario.nombre === req.params.nombre)

    usuarioEncontrado
        ? res.send(`
        <h1>Información del usuario</h1>
            <ul>
                <li>ID: ${usuarioEncontrado.id}</li>
                <li>Nombre: ${usuarioEncontrado.nombre}</li>
                <li>Edad: ${usuarioEncontrado.edad}</li>
                <li>Lugar de procedencia: ${usuarioEncontrado.lugarProcedencia}</li>
            </ul>
            <a href="/usuarios"><button>Volver</button></a>`)
        : res.status(404).send('<p>Usuario no encontrado</p><a href="/usuarios">Volver a la lista de usuarios</a>')
})


// Create
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = { id: usuarios.length + 1, nombre: req.body.nombre, edad: req.body.edad, lugarProcedencia: req.body.procedencia }

    usuarios.push(nuevoUsuario)
    res.redirect('/usuarios')
})

//Update
app.put('/usuarios/:nombre', (req, res) => {
    const index = usuarios.findIndex(usuario => usuario.nombre === req.params.nombre)
})


// Delete
app.delete('/usuarios/:nombre', (req, res) => {
    usuarios =  usuarios.filter(usuario => usuario.name !== req.params.nombre)
    
})



app.use((req, res) => {
    res.status(404).send('<h1>Página no encontrada</h1><a href="/usuarios">Volver a la lista de usuarios</a>')
})

app.listen(3000, () => {
    console.log('App está escuchando en el puerto 3000')
})