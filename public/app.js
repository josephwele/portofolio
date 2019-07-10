document.getElementById('submit ').addEventListener('click', function(event) {
    event.preventDefault()
    var userName = document.getElementById('name ').value
    var email = document.getElementById('email ').value
    var message = document.getElementById('message ').value
    var data = {
        userName: userName,
        email: email,
        message: message
    }
    document.getElementById('name ').value = ''
    document.getElementById('email ').value = ''
    document.getElementById('message ').value = ''

    fetch('http://localhost:8080/', {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => (res.status === 200) ? alert('Email Sent') : alert('Email not sent'))
})