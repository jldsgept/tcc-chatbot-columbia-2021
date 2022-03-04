const FORM = document.querySelector('#form')
FORM.addEventListener('submit', handleSubmit)

function handleSubmit(event){
    swal('Su mensaje ha sido enviado!!!','Muchas Gracias','success');
    FORM.reset();
}