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
        const value = teamID
        const consulta = 'SELECT * FROM jugadores WHERE id = $1'
        const players = await pool.query(consulta, value);
        console.log(players.rows)
        return players
    } catch (error) {
        throw error;
    }
};

const addTeam = async (equipo) => {
    try {
        const value = equipo
        const consulta = 'INSERT INTO equipos values(DEFAULT, name = $1)'
        const teams = await pool.query(consulta, value);
        console.log(teams.rows)
        return teams
    } catch (error) {
        throw error;
    }
}

const addPlayer = async ({ jugador, teamID }) => {
    try {
        const value = [jugador, teamID]
        const consulta = 'INSERT INTO jugadores values(DEFAULT, name = $1, id_equipo = $2)'
        const player = await pool.query(consulta, value);
        console.log(player.rows)
        return player
    } catch (error) {
        throw error;
    }
}

module.exports = { getTeams, addTeam, getPlayers, addPlayer, verifyCred }