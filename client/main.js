$(document).ready(function(){
    if (!localStorage.token || localStorage.token == null) {
        $('#field_login').show()
        $('#field_app').hide()
    } else {
        $('#field_login').hide()
        $('#field_app').show()
    }

    // SIGNIN
    $('#signin').submit(function(e){
        e.preventDefault()

        const user = {
            email: $('#signin_email').val(),
            password: $('#signin_password').val()
        }

        $.ajax({
            url: 'http://localhost:3000/signin',
            method: 'POST',
            data: user
        })
            .done(signin => {
                $('#signin_email').val('')
                $('#signin_password').val('')

                $('#field_login').hide()
                $('#field_app').show()

                localStorage.setItem('token', signin.token)
            })
            .fail(err => {
                console.log(err);
            })
    })

    // SIGNOUT
    $('#signout').click(function(e){
        e.preventDefault()

        $('#field_login').show()
        $('#field_app').hide()

        localStorage.removeItem('token')
    })
})