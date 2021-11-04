const url_base = 'https://tcc-chatbot-columbia-2021.herokuapp.com/'

window.addEventListener('dfMessengerLoaded',function(event) {
    const df_messenger = document.querySelector('df-messenger');
    //df_messenger.renderCustomText('Buenas noches');
    df_messenger.addEventListener('df-list-element-clicked', function(event){
        //alert('Has pulsado la opcion '+event.detail.element.title)

        if (event.detail.element.title === "Soy Cliente") {
            fetch(url_base + 'facturas')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    df_messenger.renderCustomText("Respuesta de la base de datos");
                    df_messenger.renderCustomText("Vencimiento: " + data[0].vencimiento + " (Monto : "+ data[0].monto + " GS al mes)");
                })
                .then(error => console.log(error))
        }else {
            fetch(url_base + 'servicios')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    df_messenger.renderCustomText("Respuesta de la base de datos");
                    df_messenger.renderCustomText(data[0].p_servicio + " (Precio : "+ data[0].p_precio + " GS al mes)");
                })
                .then(error => console.log(error))
        }
    })
});