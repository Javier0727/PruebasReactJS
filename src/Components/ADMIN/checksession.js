'use strict'

function checkSession() {
    if (localStorage.getItem("token") !== null) {
        fetch('http://laravel.danielserrano.com.mx/public/api/token/check', {
            method: 'POST',
            body: JSON.stringify({
                "token": localStorage.getItem("token")
            })
        })
            .then(response => response.json())
            .then(responseJSON => {
                if (!responseJSON.check) {
                    window.location.href = "/admin"
                }
            })
            .catch(err => console.log(err))
    } else {
        window.location.href = "/admin"
    }
}
export { checkSession }