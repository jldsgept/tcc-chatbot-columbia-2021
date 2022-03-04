const FORM = document.querySelector('#form')
FORM.addEventListener('submit', handleSubmit)

function handleSubmit(event){
    event.preventDefault()
    swal('Su mensaje ha sido enviado!!!','Muchas Gracias','success');
    FORM.reset();
}