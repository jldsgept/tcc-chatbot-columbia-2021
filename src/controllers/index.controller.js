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

const welcome = async (req, res) => {
    try{
        res.send('La API REST esta a la escucha');
    }catch(e) {
        console.log(e);
    }
};

const getServicios = async (req, res) => {
    try{
        const response = await pool.query(`SELECT * FROM f_get_info_servicios('APP')`)
        res.status(200).json(response.rows);
    }catch(e) {
        console.log(e);
    }
};

const webhook = async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });
    let intentMap = new Map();

    async function ticket(agent) {
        let sqlstring, nro_ticket, rs
        nro_ticket = agent.parameters['number']
        sqlstring = `SELECT * FROM f_get_estado_ticket(${nro_ticket})`
        try{
            rs = await pool.query(sqlstring)
            for (let i = 0; i <= (rs.rowCount - 1); i++) {
                agent.add(`Estimado cliente ${rs.rows[i].p_cliente} su ticket numero ${nro_ticket} de prioridad ${rs.rows[i].p_prioridad} se encuentra en estado ${rs.rows[i].p_estado} y esta siendo atendido por el departamento de ${rs.rows[i].p_departamento}`);
            }
            if (rs.rowCount === 0) {
                agent.add(`No hemos encontrado informacion sobre el ticket ${nro_ticket} que consulto`);
            }
            agent.add('Le podemos ayudar en algo mas?');
        }catch(e){
            agent.add(e)
        }
    }

    async function crearTicket(agent) {
        let sqlstring, cedula, rs, texto, prioridad
        cedula = agent.parameters['number']
        prioridad = agent.parameters['PrioridadTicket']
        texto = agent.query
        sqlstring = `SELECT p_inserta_ticket('${cedula}', 1, '${texto}', '${prioridad}')`
        try{
            rs = await pool.query(sqlstring)
            for (let i = 0; i <= (rs.rowCount - 1); i++) {
                if (rs.rows[i].p_inserta_ticket > 0) {
                    agent.add(`Se ha creado un ticket para atender su caso. El numero de su ticket para darle seguimiento es:  ${rs.rows[i].p_inserta_ticket}`)
                }else {
                    agent.add(`No se puede crear el ticket debido a que el numero de cedula ${cedula} no pertenece a un cliente registrado`)
                }
            }
            agent.add('Le podemos ayudar en algo mas?');
        }catch(e){
            agent.add(e)
        }
    }

    async function verFactura(agent) {
        let sqlstring, cedula, rs
        cedula = agent.parameters['number']
        sqlstring = `SELECT * FROM f_get_info_proxima_factura('${cedula}')`
        try{
            rs = await pool.query(sqlstring)
            for (let i = 0; i <= (rs.rowCount - 1); i++) {
                agent.add(`Estimado cliente ${rs.rows[i].p_nombre}, su proxima factura es por el monto de ${rs.rows[i].p_monto} GS y vence en fecha ${rs.rows[i].p_vencimiento}`)
            }
            if (rs.rowCount === 0) {
                agent.add(`No se han encontrado facturas pendientes para el numero de cedula: ${cedula}`);
            }
            agent.add('Le podemos ayudar en algo mas?');
        }catch(e){
            agent.add(e)
        }
    }

    async function verSugerencias(agent) {
        let sqlstring, codigo, rs
        codigo = agent.parameters['number']
        sqlstring = `SELECT * FROM f_get_info_errores_frecuentes('${codigo}')`
        try{
            rs = await pool.query(sqlstring)
            for (let i = 0; i <= (rs.rowCount - 1); i++) {
                if (i === 0) {
                    agent.add(`Hemos encontrado las siguientes sugerencias para el error (${codigo} - ${rs.rows[i].p_error}):`);
                }
                agent.add(`(${(i+1)}) ${rs.rows[i].p_sugerencia}`)
            }
            if (rs.rowCount === 0) {
                agent.add('No hemos encontrado una sugerencia para su error. Le sugerimos que cree un ticket de soporte indicando mas detalles sobre su inconveniente.');
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

    intentMap.set('ticket', ticket);
    intentMap.set('CrearTicket', crearTicket);
    intentMap.set('VerServicios', verServicios);
    intentMap.set('VerFactura', verFactura);
    intentMap.set('VerSugerencias', verSugerencias);
    agent.handleRequest(intentMap);
};

module.exports = {
    welcome,
    getServicios,
    webhook
};