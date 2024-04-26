const modalContainer =  document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

function toggleModal(){
    modalContainer.classList.toggle("active")
}

modalTriggers.forEach(trigger=>trigger.addEventListener("click", toggleModal));


//on insère dynamiquement les photos dans la galerie 
import { getWorks } from "./worksAndFilters.js";
const token = localStorage.getItem('token');


async function displayPhotos(){
    const data = await getWorks();
    const gallery = document.querySelector(".modal--gallery");
    
    data.forEach(work =>{ //pour chaque travaux récupérés on créé un container qui contient galerie et bin, chaque container s'ajoutent a la galerie
    const containerPhoto= document.createElement('li');
    const workImg = document.createElement('img');
    workImg.src = work.imageUrl;
    const workBin = document.createElement('i');
    workBin.className ="fa-solid fa-trash-can";
    workBin.setAttribute('work-id', work.id);
    containerPhoto.appendChild(workImg);
    containerPhoto.appendChild(workBin);
    gallery.appendChild(containerPhoto);

    workBin.addEventListener("click", event=>{
        const workBinId = workBin.getAttribute('work-id');
        console.log(workBinId);
        fetch(`http://localhost:5678/api/works/${workBinId}`, {method :'DELETE', headers: {
            'Authorization': `Bearer ${token}`
        }});
    })

});
}
displayPhotos();

//passage de la modale une à la modale deux, et vice versa
const modalOne = document.querySelector(".modalOne");
const modalTwo = document.querySelector(".modalTwo");

function toggleModalOneTwo(){
    modalOne.classList.toggle("none");
    modalTwo.classList.toggle("active");
}

const triggerModalOneTwo = document.querySelectorAll(".triggerModalOneTwo");
triggerModalOneTwo.forEach(trigger =>trigger.addEventListener("click", toggleModalOneTwo));
let optionIdInteger;

import { getFilters } from "./worksAndFilters.js";7
async function displayFilters(){
    const data = await getFilters();
    let options = document.querySelector("select");
    console.log(data);
    data.forEach(filter=>{
        let option = document.createElement('option');
        option.setAttribute("id", filter.id);
        option.innerText=`${filter.name}`;
        options.appendChild(option);
        const optionId = option.getAttribute("id");
        optionIdInteger = parseInt(optionId);
    })
}

displayFilters();

function isAFileJoined(input){
    if (input.files && input.files.length > 0) {
        return input.files[0];
    } else {
        return null; 
    }
}

const inputElement = document.querySelector('.joinPhoto');
const imagePreview = document.getElementById('imagePreview');

inputElement.addEventListener('change', function(event){
    if (inputElement.files && inputElement.files[0]){
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imagePreview.innerHTML = '';
            imagePreview.appendChild(imgElement);
    };
    reader.readAsDataURL(inputElement.files[0]);
}
});






const form = document.querySelector('.modalForm');
// const errorMessage =  document.querySelector('.errorMessage');

form.addEventListener('submit', event=>{
    event.preventDefault();
    console.log('Vous avez validé l\'ajout de la photo');
    const body = {
        image: event.target.querySelector("[name=photo").value,
        title: event.target.querySelector("[name=title").value,
        category: optionIdInteger
    }
    console.log(body);
    console.log(typeof body.image);
    console.log(typeof body.title);
    console.log(typeof body.category);

    const chargeUtile = JSON.stringify(body);

    fetch('http://localhost:5678/api/works', {method: "POST", headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` }, body: chargeUtile })
    .then(response => {
        if (!response.ok) {
            throw new Error('Échec de l\'ajout du produit.');
        }
        return response.json(); 
    })
    .catch(error => {
        console.error('Erreur de connexion :', error.message);
        console.log('Erreur de connexion :', error.message);
    });

});


