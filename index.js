
const loadNews = async () => {

    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.data.news_category;
    }
    catch (error) {
        console.log(error);
    }

}
// -----------catagories----------
const categoryName = async () => {
    const data = await loadNews();
    console.log(data);

    const categoryCard = document.getElementById('catagories-card');
    data.forEach(cName => {
        const { category_name } = cName;
        // console.log(cName.category_id)
        // console.log(cName.category_name);
        const createDiv = document.createElement('div');
        // createDiv.classList.add("d-flex")
        createDiv.innerHTML = `
        <div class=""  >
         <p class="inline px-3 py-2" onclick ='LoadDetails("${cName.category_id}")'>${category_name}</p>
          
            </div >
    `;
        categoryCard.appendChild(createDiv);
    })

}

// ----------details-----

const LoadDetails = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagoryDetais(data.data))
        .catch(error => console.log(error))
}

const displayCatagoryDetais = cId => {
    // console.log(cId);
    toggle(true);
    const detailsCard = document.getElementById('details-card');
    detailsCard.innerHTML = ``;
    cId.forEach(cDetails => {
        const { author, image_url, title, details, thumbnail_url, total_view, _id } = cDetails;
        // console.log(_id);
        const { img, name, published_date } = author;
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <div class="card mb-3"">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.slice(0, 200)}</p>
                    <div class="d-flex justify-content-between w-50">
                    <img src="${thumbnail_url}"  class="rounded-circle" style="height:50px; width:50px; border-radius: 50%;" alt="...">
                        <p>${total_view}</p>
                        <button onclick='loadMoreDetails("${_id}")' type="button" class="btn btn-primary"
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Launch static backdrop modal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
         `;

        detailsCard.appendChild(createDiv);
    });
    toggle(false);
}
// --------------spinner-------------
const toggle = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

// ----------modal details-------------

const loadMoreDetails = (_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => moreDetails(data.data))
    // .catch(error => console.log(error))
}



const moreDetails = modal => {
    console.log(modal);
    const detailsCard = document.getElementById('modal');
    const createDiv = document.createElement('div');
    createDiv.innerHTML = `
        <div class="card mb-3"">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <p class="card-text">sdsdsd</p>
                    <div class="d-flex justify-content-between w-50">
                        <p>dsds</p>
                     
                    </div>
                </div>
            </div>
        </div>
    </div>
         `;

    detailsCard.appendChild(createDiv);

}







// displayCatagoryDetais();
loadNews();
categoryName();

