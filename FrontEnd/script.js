//Récupérer les travaux//
async function  getWorks (){
const response = await fetch('http://localhost:5678/api/works');
return(response.json());};

//Afficher les travaux//
async function displayWorks() {
    const data = await getWorks();
    // console.log(data);

        data.forEach(work => {

            let container = document.querySelector('.gallery');
            const workContainer = document.createElement('figure');
            const workImg = document.createElement('img');
            workImg.src = work.imageUrl;
            const workFigCaption = document.createElement('figcaption');  
            workFigCaption.innerText = `${work.title}`;

            workContainer.appendChild(workImg);
            workContainer.appendChild(workFigCaption);
            container.appendChild(workContainer);
            console.log(workFigCaption);
        });
    }

displayWorks();


