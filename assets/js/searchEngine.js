window.addEventListener("DOMContentLoaded", loadLostThings);

async function loadLostThings(){

    let request = await fetch("http://localhost:3000/lost_things/");
    let response = await request.json();

    console.log(response);

    createCards(response);
}

let container = document.getElementById("cards-container");
function createCards(data){

    let row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    data.forEach(element => {
        let col = document.createElement("div");
        col.classList.add("col-lg-3", "col-md-6" ,"col-12", "mb-4", "mb-lg-0");
        row.appendChild(col);
        let card = ` <div class="custom-block bg-white border">
                    <a href="#">
                        <div class="d-flex">
                            <div>
                                <h5 class="mb-2">${element.element}</h5>

                                <span class="mb-0">${element.description}</span>
                            </div>

                            <span class="badge bg-design rounded-pill ms-auto">${element.id}</span>
                        </div>

                        <img src="${element.img}"
                            class="custom-block-image img-fluid" alt="${element.id}">
                    </a>
                </div>`;

        col.innerHTML = card;

        console.log(element);
    });
}

const inputSearch = document.getElementById("keyword");

inputSearch.addEventListener("keyup", async (event)=>{
    let search = event.target.value;
    console.log(search.length);

    const divResults = document.getElementById("results");

    if (search.length = 0 || isNaN(search.length) || !search) {
        loadLostThings();
    }else{
        container.innerHTML = "";
        let request = await fetch("http://localhost:3000/lost_things/");
        let response = await request.json();

        let result = response.filter(item =>{
            return item.element.includes(search) || item.description.includes(search);
        })

        createCards(result);
        
    }
})

