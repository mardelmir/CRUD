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
app.get('/', (req, res) => { res.redirect('/usuarios') })

app.get('/usuarios', (req, res) => { res.json(usuarios) })

app.get('/usuarios/:nombre', (req, res) => {
    const usuarioEncontrado = usuarios.find(usuario => usuario.nombre === req.params.nombre)

    usuarioEncontrado
        ? res.json(usuarioEncontrado)
        : res.status(404).send('Usuario no encontrado')
})


// Create
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = { id: usuarios.length + 1, ...req.body }
    usuarios.push(nuevoUsuario)
    res.json(usuarios)
})


//Update
app.put('/usuarios/:nombre', (req, res) => {
    const indexUsuario = usuarios.findIndex(usuario => usuario.nombre === req.params.nombre)

    if (indexUsuario !== -1) {
        usuarios[indexUsuario] = {
            id: usuarios[indexUsuario].id,
            nombre: req.body.nombre || usuarios[indexUsuario].nombre,
            edad: req.body.edad || usuarios[indexUsuario].edad,
            lugarProcedencia: req.body.lugarProcedencia || usuarios[indexUsuario].lugarProcedencia
        };

        res.json(usuarios);
    } else {
        res.status(404).send('Usuario no encontrado')
    }
})


// Delete
app.delete('/usuarios/:nombre', (req, res) => {
    const encontrarUsuario = usuarios.find(usuario => usuario.nombre == req.params.nombre)

    if (encontrarUsuario) {
        usuarios = usuarios.filter(usuario => usuario.nombre !== req.params.nombre)

        let nuevaId = 1;
        for (const usuario of usuarios) { usuario.id = nuevaId++ }

        res.json(usuarios);
    } else { res.status(404).send('usuario no encontrado') }
})


app.use((req, res) => { res.status(404).send('Página no encontrada') })

app.listen(3000, () => { console.log('App está escuchando en el puerto http://localhost:3000') })