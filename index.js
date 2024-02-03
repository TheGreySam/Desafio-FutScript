const express = require('express');
const app = express();

app.listen(3000, console.log("SERVER ON"));
app.use(express.json())

const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores')
const { obtenerEquipos, agregarEquipo } = require('./controllers/equipos')


app.get("/equipos", obtenerEquipos)
app.post("/equipos", agregarEquipo)

app.get("/equipos/:teamID/jugadores", obtenerJugadores)
app.post("/equipos/:teamID/jugadores", registrarJugador)

app.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body
        await verificar(email, password)
        const token = jwt.sign({ email }, "az_AZ")
        res.send(token)
    } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)
    }
})