const form = document.querySelector('.login');

form.addEventListener('submit', event=>{
    event.preventDefault();
    console.log('Vous avez validé le formulaire de connexion');
    const body = {
        email: event.target.querySelector("[name=email").value,
        password: event.target.querySelector("[name=password").value,
    }
    console.log(body);
    const chargeUtile = JSON.stringify(body);
    fetch('http://localhost:5678/api/users/login', {method: "POST", headers: { "Content-Type": "application/json" }, body: chargeUtile });
});

// email: sophie.bluel@test.tld

// password: S0phie 