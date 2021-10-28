window.addEventListener('dfMessengerLoaded',function(event) {
    const df_messenger = document.querySelector('df-messenger');
    //df_messenger.renderCustomText('Buenas noches');
    df_messenger.addEventListener('df-list-element-clicked', function(event){
        alert('Has pulsado la opcion '+event.detail.element.title)
        fetch('http://localhost:4000/tasks/')
            .then(response => response.json())
            .then(data => console.log(data))
            .then(error => console.log(error))
    })
});