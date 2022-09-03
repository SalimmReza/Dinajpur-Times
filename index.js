
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
    // console.log(data);

    const categoryCard = document.getElementById('catagories-card');
    data.forEach(cName => {

        const { category_name } = cName;
        // console.log(cName.category_id)
        // console.log(cName.category_name);
        const createDiv = document.createElement('div');
        createDiv.classList.add("catagory")
        createDiv.innerHTML = `
        <div class=""  >
         <p class="inline px-3 py-md-2" onclick ='LoadDetails("${cName.category_id}")'>${category_name}</p>
         
            </div >
    `;

        categoryCard.appendChild(createDiv);
    })

}

// ----------details-----

const LoadDetails = (category_id) => {

    // const actName = categoryName();
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagoryDetais(data.data))
        .catch(error => console.log(error))
}

const displayCatagoryDetais = (cId) => {
    // const actName = categoryName(category_name);
    toggle(true);
    // console.log(cId);
    // console.log(actName);
    // -------------length of array-----------
    // console.log(cId.length);

    //display no phones found
    const h2 = document.getElementById('no-phones-found');
    if (cId.length === 0) {
        h2.classList.remove('d-none');
    }
    else {
        h2.classList.add('d-none');
    }

    const countArray = document.getElementById('count-items');
    countArray.innerHTML = ``;
    const createDiv = document.createElement('div');
    createDiv.innerHTML = `
     <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${cId.length} Items Found</h5>
                </div>
            </div>
    `;
    countArray.appendChild(createDiv);
    // -------------end length of array-----------

    // console.log(toggle);
    const detailsCard = document.getElementById('details-card');
    detailsCard.innerHTML = ``;

    // --------------------------sort--
    cId.sort((a, b) => b.total_view - a.total_view);

    cId.forEach((cDetails) => {
        // console.log(`${cDetails.total_view}`);
    });
    // -------------------------sort--end
    cId.forEach(cDetails => {
        const { author, image_url, title, details, thumbnail_url, total_view, _id } = cDetails;
        const { img, name, published_date } = author;
        // console.log(_id);



        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <div class="card mb-3"">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${image_url}" class="img-fluid h-100 rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body mt-4">
                    <h5 class="card-title">${title ? title : "no title"}</h5>
                    <p class="card-text">${details.length > 300 ? details.slice(0, 300) + "..." : details}</p>
                    <div class="d-flex justify-content-between infos" >
                    <div class="d-flex align-items-center">
                    <img src="${img}"  class="rounded-circle m-2" style="height:50px; width:50px; border-radius: 50%;" alt="...">
                    <div> 
                    <h5 class =" m-0 text-start" >${name ? name : "no name"}</h5>
                    <h5 class ="text-start m-0" style ="font-size: 12px;" >${published_date ? published_date.slice(0, 10) : "no date"}</h5>
                    </div>
                    </div>
                   
                    <div class="d-flex align-items-center">
                    <i class="fa-solid fa-eye m-2"></i>
                    <p class ="text-center" style="margin-top: 15px;">${total_view ? total_view : "no views"}</p>
                </div>
                <div class="mt-4 mx-3">
                <i onclick='loadMoreDetails("${_id}")' class="fa-solid fa-arrow-right class="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                </div> 
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
        .then(data => moreDetails(data.data[0]))
        .catch(error => console.log(error))
}



const moreDetails = modal => {
    console.log(modal);

    // const { name, published_date } = author;
    const detailsCard = document.getElementById('modal');
    detailsCard.innerHTML = ``;
    const createDiv = document.createElement('div');
    createDiv.innerHTML = `
    <img src="${modal.image_url}"class="w-100 h-25" alt="">
    <p>${modal.details}</p>
    <h5 class =" m-0 text-start" >${modal.author.name ? modal.author.name : "no name"}</h5>
    <p class="fw-bold">Date: ${modal.author.published_date ? modal.author.published_date : "no date"}</p>
    <div class="d-flex align-items-center">
                    <i class="fa-solid fa-eye m-2"></i>
                    <p class ="text-center" style="margin-top: 15px;">${modal.total_view ? modal.total_view : "no views"}</p>
                </div>
         `;

    detailsCard.appendChild(createDiv);

}




// loadNews();
categoryName();
LoadDetails('08');