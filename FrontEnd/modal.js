const modalContainer =  document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

//passage de la modale une à la modale deux, et vice versa
const modalOne = document.querySelector(".modalOne");
const modalTwo = document.querySelector(".modalTwo");

function toggleModalOneTwo(){
    modalOne.classList.toggle("none");
    modalTwo.classList.toggle("active");
}

function clearForm() { //sert quand la modale est fermée, pour vider le formulaire
    form.reset(); 
    imagePreview.innerHTML = ''; 
}

function toggleModal() {
    if (modalContainer.classList.contains("active")) {
        modalContainer.classList.remove("active");
        clearForm();
    } else {
        modalContainer.classList.add("active");
        modalOne.classList.remove("none");
        modalOne.classList.add("active"); // Afficher la modalOne lors de l'ouverture de la modale
        modalTwo.classList.remove("active"); // Masquer la modalTwo lors de l'ouverture de la modale
    }
}

modalTriggers.forEach(trigger=>trigger.addEventListener("click", toggleModal));

const triggerModalOneTwo = document.querySelectorAll(".triggerModalOneTwo");
triggerModalOneTwo.forEach(trigger =>trigger.addEventListener("click", toggleModalOneTwo));



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

form.addEventListener('submit', event=>{
    event.preventDefault();

    const body = {
        image: event.target.querySelector("[name='photo']").files[0],
        title: event.target.querySelector("[name='title']").value,
        category: optionIdInteger
    }

    const formData = new FormData();
    formData.append("image", body.image);
    formData.append("title", body.title);
    formData.append("category", body.category);

    fetch('http://localhost:5678/api/works', {method: "POST", headers: {'Authorization': `Bearer ${token}`}, body: formData })
    .then(response => {
        if (!response.ok) {
            throw new Error('Échec de l\'ajout du produit.');
        }
        return response.json(); 
    })
        .then(data => {
            alert('Formulaire envoyé avec succès !');
            location.reload();
        })
        .catch(error => {
            console.error('Erreur de connexion :', error.message);
            alert('Une erreur s\'est produite lors de l\'envoi du formulaire.');
        });
});