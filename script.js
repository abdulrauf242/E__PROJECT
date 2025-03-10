// offcanvas
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const closeBtn = document.getElementById("close-btn");
    const offcanvasMenu = document.getElementById("offcanvas-menu");
    const overlay = document.getElementById("overlay");

    menuToggle.addEventListener("click", function () {
        offcanvasMenu.classList.add("show");
        overlay.classList.add("show");
    });

    closeBtn.addEventListener("click", function () {
        offcanvasMenu.classList.remove("show");
        overlay.classList.remove("show");
    });

    overlay.addEventListener("click", function () {
        offcanvasMenu.classList.remove("show");
        overlay.classList.remove("show");
    });

    // dynamic cards
    fetch("main.json")
        .then(response => response.json())
        .then(json => {
            let mainCards = document.getElementById("main-cards");
            mainCards.innerHTML = ''; // Clear the container before appending new cards
            json.forEach(item => {
                mainCards.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <img src="${item.img}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.disc}</p>
                        <p class="card-text">Price: ${item.price}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                `;
            });
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
});