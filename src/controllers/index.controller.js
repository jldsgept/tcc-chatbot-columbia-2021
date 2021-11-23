const { Pool } = require('pg');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');


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
        let sqlstring, cedula, rs
        cedula = agent.parameters['number']
        sqlstring = `SELECT * FROM f_get_info_proxima_factura('${cedula}')`
        try{
            rs = await pool.query(sqlstring)
            for (let i = 0; i <= (rs.rowCount - 1); i++) {
                agent.add(`Hola ${rs.rows[i].p_nombre} su proxima factura por el monto de ${rs.rows[i].p_monto} GS vence en fecha ${rs.rows[i].p_vencimiento}`)
            }
            agent.add('Le podemos ayudar en algo mas?');
        }catch(e){
            agent.add(e)
        }
    }

    async function verServicios(agent) {
        let sqlstring, tipo_servicio, rs
        tipo_servicio = agent.parameters['TiposServicios']
        sqlstring = `SELECT * FROM f_get_info_servicios('${tipo_servicio}')`
        try{
            rs = await pool.query(sqlstring)
            agent.add('Estos son los servicios que tenemos de '+ tipo_servicio);
            for (let i = 0; i <= (rs.rowCount - 1); i++) {
                agent.add(`${rs.rows[i].p_servicio} por ${rs.rows[i].p_precio} GS/mes \n ${rs.rows[i].p_especificaciones}`)
                agent.add(new Card({
					                title: `${rs.rows[i].p_servicio} por ${rs.rows[i].p_precio} GS/mes`,
                                    imageUrl: rs.rows[i].p_url_imagen,
                                    text: rs.rows[i].p_especificaciones,
                                    buttonText: 'Ver Servicio',
                                    buttonUrl: rs.rows[i].p_url_imagen
				                    })
			            )
            }
            agent.add('Le interesa algun otro servicio?');
        }catch(e){
            agent.add(e)
        }
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