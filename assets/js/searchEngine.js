window.addEventListener("DOMContentLoaded", loadLostThings);

async function loadLostThings(){

    let request = await fetch("http://localhost:3000/lost_things/");
    let response = await request.json();

    console.log(response);

    createCards(response);
}

function createCards(data){
    let container = document.getElementById("cards-container");

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
                                <h5 class="mb-2">${element.element}n</h5>

                                <span class="mb-0">${element.description}</span>
                            </div>

                            <span class="badge bg-design rounded-pill ms-auto">${element.id}</span>
                        </div>

                        <img src="https://cdn.pixabay.com/photo/2023/09/08/05/28/gibbon-8240408_1280.png"
                            class="custom-block-image img-fluid" alt="${element.id}">
                    </a>
                </div>`;

        col.innerHTML = card;

        console.log(element);
    });
}