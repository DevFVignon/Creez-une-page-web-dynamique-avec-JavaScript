const modalContainer =  document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

function toggleModal(){
    modalContainer.classList.toggle("active")
}

modalTriggers.forEach(trigger=>trigger.addEventListener("click", toggleModal));


//on insère dynamiquement les photos dans la galerie 
import { getWorks } from "./worksAndFilters.js";

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
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5678/api/works/${workBinId}`, {method :'DELETE', headers: {
            'Authorization': `Bearer ${token}`
        }});
    })

});
}
displayPhotos();


const modalOne = document.querySelector(".modalOne");
const modalTwo = document.querySelector(".modalTwo");

function toggleModalOneTwo(){
    modalOne.classList.toggle("none");
    modalTwo.classList.toggle("active");
}

const triggerModalOneTwo = document.querySelectorAll(".triggerModalOneTwo");
triggerModalOneTwo.forEach(trigger =>trigger.addEventListener("click", toggleModalOneTwo));


