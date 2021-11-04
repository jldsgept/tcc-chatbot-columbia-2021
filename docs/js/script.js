const url_base = 'https://tcc-chatbot-columbia-2021.herokuapp.com/'

window.addEventListener('dfMessengerLoaded',function(event) {
    const df_messenger = document.querySelector('df-messenger');
    //df_messenger.renderCustomText('Buenas noches');
    df_messenger.addEventListener('df-list-element-clicked', function(event){
        //alert('Has pulsado la opcion '+event.detail.element.title)
        fetch(url_base + 'servicios')
            .then(response => response.json())
            .then(data => {
                df_messenger.renderCustomText("Respuesta de la base de datos");
                df_messenger.renderCustomText(data.p_servicio[0]);
                console.log(data)
            })
            .then(error => console.log(error))
    })
});