//const bcrypt = require('bcryptjs')
const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'futscript',
    allowExitOnIdle: true
})

const verifyCred = async (email, password) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1 AND password = $2"
    const values = [email, password]
    const { rowCount } = await pool.query(consulta, values)
    if (!rowCount)
        throw { code: 404, message: "No se encontró ningún usuario con estas credenciales" }
}

const getTeams = async () => {
    const team = await pool.query("SELECT * FROM equipos")
    console.log(team.rows)
    return team
}
//SELECT * FROM jugadores WHERE id_equipo =1$
const getPlayers = async (teamID) => {
    try {
        const players = await db.query('SELECT * FROM jugadores WHERE id_equipo = $1', [teamID]);
        return players.rows;
    } catch (error) {
        throw error;
    }
};

const addTeam = async (equipo) => {
    //...
}

const addPlayer = async ({ jugador, teamID }) => {
    //...
}

module.exports = { getTeams, addTeam, getPlayers, addPlayer, verifyCred }