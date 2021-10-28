const { Pool } = require('pg');

const config = {
    user: 'postgres',
    host: 'localhost',
    password:'postgres',
    database: 'postgres'
}

const pool = new Pool(config)

const getServicios = async (req, res) => {
    try{
        const response = await pool.query(`SELECT * FROM f_get_info_servicios('ENTERPRISE')`)
        console.log(response.rows[0].p_servicio)
        res.status(200).json(response.rows);
    }catch(e) {
        console.log(e);
    }
};

/*
const createTask = async (req, res) => {
    const { id, descripcion } = req.body;
    const response = await pool.query('INSERT INTO tareas (id, descripcion) VALUES ($1, $2)', [id, descripcion]);
    res.json({
        message: 'Task updated successfully',
        body: {
            task: {id, descripcion}
        }
    })
};*/

module.exports = {
    getServicios
};