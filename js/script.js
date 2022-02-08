const FORM = document.querySelector('#form')
const SEND_MAIL = document.querySelector('#send_mail')

FORM.addEventListener('submit', handleSubmit)

function handleSubmit(event){
    event.preventDefault()
    const FORM_DATA = new FormData(this)
    let name, email, subject, message
    name = FORM_DATA.get('nombre')
    email = FORM_DATA.get('email')
    subject = `Mensaje de ${name} (${email})`
    message = FORM_DATA.get('contenido')
    SEND_MAIL.setAttribute('href',`mailto:jldsgept.tcc2021@gmail.com?subject=${subject}&body=${message}`)
    SEND_MAIL.click()
}