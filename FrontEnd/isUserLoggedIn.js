function isUserLoggedIn() {
    return localStorage.getItem('token') !== null;
}

const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const modifyButton = document.getElementById('modifyButton');


function userLoggedIn(){
    if (isUserLoggedIn()){
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
        modifyButton.style.display = 'inline-flex';
    }else{
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
        modifyButton.style.display = 'none';
    }
};

userLoggedIn();

logoutButton.addEventListener('click', event=>{
    localStorage.removeItem('token');
    userLoggedIn();
});