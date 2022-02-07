const FORM = document.querySelector('#form')
const SEND_MAIL = document.querySelector('#send_mail')

FORM.addEventListener('submit', handleSubmit)

function handleSubmit(event){
    event.preventDefault()
    const a_form = new FormData(this)
    SEND_MAIL.setAttribute('href',`mailto:jldubrez@gmail.com?subject=Mensaje de ${a_form.get('nombre')} (${a_form.get('email')})&body=${a_form.get('contenido')}`)
    SEND_MAIL.click()
}