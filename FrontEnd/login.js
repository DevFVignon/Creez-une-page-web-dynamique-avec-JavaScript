const form = document.querySelector('.login');
const errorMessage =  document.querySelector('.errorMessage');

form.addEventListener('submit', event=>{
    event.preventDefault();
    console.log('Vous avez validé le formulaire de connexion');
    const body = {
        email: event.target.querySelector("[name=email").value,
        password: event.target.querySelector("[name=password").value,
    }
    console.log(body);
    const chargeUtile = JSON.stringify(body);
    fetch('http://localhost:5678/api/users/login', {method: "POST", headers: { "Content-Type": "application/json" }, body: chargeUtile })
    .then(response => {
        if (!response.ok) {
            throw new Error('Échec de la connexion.');
        }
        return response.json(); 
    })
    .then(data => { 
        localStorage.setItem('token', data.token);
        // getToken();
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Erreur de connexion :', error.message);
        errorMessage.style.display = 'block';
    });
});








// email: sophie.bluel@test.tld

// password: S0phie 




