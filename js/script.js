const FORM = document.querySelector('#form')
FORM.addEventListener('submit', handleSubmit)

function handleSubmit(event){
    event.preventDefault()
    swal('Su mensaje ha sido enviado!!','Muchas Gracias','success');

    let nombre, email, contenido
    nombre = document.getElementById('nombre');
    email = document.getElementById('email');
    contenido = document.getElementById('contenido');
    nombre.value = '';
    email.value = '';
    contenido.value = '';
}