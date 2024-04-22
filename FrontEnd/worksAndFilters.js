//Récupérer les travaux//
async function  getWorks (){
const response = await fetch('http://localhost:5678/api/works');
return(response.json());};

function displayAWork(work){
    let container = document.querySelector('.gallery'); //là où s'affichent les travaux dans le HTML
    const workContainer = document.createElement('figure'); // création dynamique card pour présenter un travaux
    const workImg = document.createElement('img');
    workImg.src = work.imageUrl;
    const workFigCaption = document.createElement('figcaption');  
    workFigCaption.innerText = `${work.title}`;
    workContainer.appendChild(workImg);
    workContainer.appendChild(workFigCaption);
    container.appendChild(workContainer);
}

//Afficher les travaux//
async function displayWorks(){
    const data = await getWorks();
    const container = document.querySelector('.gallery');
    container.innerHTML = ''; 
        data.forEach(work => {
            displayAWork(work);
        });
    } 

//fonction récupérer les filtres (sauf celui 'Tous')
async function getFilters (){
    const response = await fetch('http://localhost:5678/api/categories');
    return(response.json());};
    
//fonction afficher les filtres 
async function displayFilters (){
    const data = await getFilters(); // on attend et enregistre le retour de la récupération des filtres
    let container = document.querySelector('.filters'); //là où seront affichés les filtres
    let buttonFilter = document.createElement('button'); // début création du bouton filtre pour 'Tous' les travaux
    buttonFilter.innerHTML='Tous';
    buttonFilter.setAttribute('data-id', 0);
    container.appendChild(buttonFilter);

    //on créé tout les filtres spécifiques (tous sauf 'Tous')
    data.forEach(filter=>{
        buttonFilter = document.createElement('button');
        buttonFilter.innerText=`${filter.name}`;
        buttonFilter.setAttribute('data-id', filter.id);
        container.appendChild(buttonFilter);
    });
};

// On trie, cad on affiche les travaux si id du travaux = id du bouton 
function triWorks(buttonId, works){
    const container = document.querySelector('.gallery');
    container.innerHTML = '';
    works.forEach(work =>{
        if (buttonId===work.categoryId.toString() || buttonId === '0'){
                displayAWork(work);
        };
    });
};

// On écoute le bouton cliqué par l'utilisateur et récupéront l'id lié
async function btnToListen(){
    await displayFilters();
    const buttonsToListen= document.querySelectorAll("button");
    buttonsToListen.forEach(button => {
        button.addEventListener("click", async (event) => {
        const buttonId = button.getAttribute('data-id');
        const works = await getWorks();
        triWorks(buttonId, works);
    });
});}

async function main () {
    await btnToListen();
    await displayWorks();
};

main();



