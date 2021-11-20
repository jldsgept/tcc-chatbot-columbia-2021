const { Pool } = require('pg');
const {WebhookClient} = require('dialogflow-fulfillment');

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

const webhook = async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });
    let intentMap = new Map();

    function verFactura(agent) {
        agent.add(`Ver Factura`);
    }

    function verServicios(agent) {
        let tipo_servicio = agent.parameters.tiposservicios
        agent.add('Estos son los servicios que tenemos de '+ tipo_servicio);
        agent.add('Le interesa algun otro servicio?');
    }

    function verTicket(agent) {
        agent.add(`Ver Ticket`);
    }

    intentMap.set('VerTicket', verTicket);
    intentMap.set('VerServicios', verServicios);
    intentMap.set('VerFactura', verFactura);
    agent.handleRequest(intentMap);
};

module.exports = {
    getServicios,
    getFacturas,
    webhook
};