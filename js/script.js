const FORM = document.querySelector('#form')
FORM.addEventListener('submit', handleSubmit)

function handleSubmit(event){
    event.preventDefault()
    swal('Su mensaje ha sido enviado','Muchas Gracias','success');
    /*const FORM_DATA = new FormData(this)
    let name, email, subject, message
    name = FORM_DATA.get('nombre')
    email = FORM_DATA.get('email')
    subject = `Mensaje de ${name} (${email})`
    message = FORM_DATA.get('contenido')
    SEND_MAIL.setAttribute('href',`mailto:jldsgept.tcc2021@gmail.com?subject=${subject}&body=${message}`)
    SEND_MAIL.click()*/
}