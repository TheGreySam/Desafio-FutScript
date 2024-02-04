const express = require('express');
const app = express();
const cors = require('cors')
const jwt = require("jsonwebtoken")

app.listen(3000, console.log("SERVER ON"));
app.use(express.json())
app.use(cors())

const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores')
const { obtenerEquipos, agregarEquipo } = require('./controllers/equipos');
const {verifyCred}  = require('./db/consultas');
//const {secretKey} = require('.utils')



app.get("/equipos", obtenerEquipos)
app.post("/equipos", agregarEquipo)

app.get("/equipos/:teamID/jugadores", obtenerJugadores)
app.post("/equipos/:teamID/jugadores", registrarJugador)



app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        await verifyCred(email, password)
        const token = jwt.sign({ email }, "az_AZ")
        res.send(token)
    } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)
    }
})

