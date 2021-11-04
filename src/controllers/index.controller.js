const { Pool } = require('pg');

const config = {
    host: 'ec2-54-159-176-167.compute-1.amazonaws.com',
    port: "5432",
    user: 'wdubdcqfwuzars',
    password:'77a9ed59b8e487d0b7068772d1cee02fcab03d0afef2f2f0a2874959e6593d8b',
    database: 'd2545sl3d2sgsr',
    ssl: {
        rejectUnauthorized: false
    }
}

const pool = new Pool(config)

const getServicios = async (req, res) => {
    try{
        const response = await pool.query(`SELECT * FROM f_get_info_servicios('ENTERPRISE')`)
        res.status(200).json(response.rows);
    }catch(e) {
        console.log(e);
    }
};


const getFacturas = async (req, res) => {
    try{
        const response = await pool.query(`SELECT  '2021-12-15' as vencimiento, 85000 as monto`)
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
    getServicios,
    getFacturas
};