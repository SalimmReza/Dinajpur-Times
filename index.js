
const showNews = async () => {

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
// ----------left menu--------------
const categoryName = async () => {
    const data = await showNews();
    console.log(data);

    const categoryCard = document.getElementById('catagories-card');
    data.forEach(cName => {

        const { category_name } = cName;
        console.log(cName.category_name);
        const createDiv = document.createElement('div');
        // createDiv.classList.add("d-flex")
        createDiv.innerHTML = `
        <div class="card flex-row d-flex">
                <p class="inline px-3 py-2">${category_name}</p>
            </div> 
        `;
        categoryCard.appendChild(createDiv);
    })

}

// }

categoryName();

