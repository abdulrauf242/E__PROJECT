// Offcanvas Menu
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const closeBtn = document.getElementById("close-btn");
    const offcanvasMenu = document.getElementById("offcanvas-menu");
    const overlay = document.getElementById("overlay");

    const closeOffcanvas = () => {
        offcanvasMenu.classList.remove("show");
        overlay.classList.remove("show");
    };

    menuToggle.addEventListener("click", function () {
        offcanvasMenu.classList.add("show");
        overlay.classList.add("show");
    });

    closeBtn.addEventListener("click", closeOffcanvas);
    overlay.addEventListener("click", closeOffcanvas);

    // Dynamic Cards
    fetch("main.json")
        .then(response => response.json())
        .then(json => {
            const mainCards = document.getElementById("main-cards");
            mainCards.innerHTML = ""; // Clear existing cards

            json.forEach(item => {
                mainCards.innerHTML += `
                    <div class="card" style="width: 18rem;">
                        <img src="${item.img}" class="card-img-top" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.disc}</p>
                            <b><p class="card-text">Price: ${formatPrice(item.price)}</p></b> <br>
                            <a href="#" class="btn btn-primary">Buy Now</a>
                        </div>
                    </div>`;
            });
        })
        .catch(error => console.error("Error fetching the JSON data:", error));

    // Helper Function to Format Price
    function formatPrice(price) {
        return new Intl.NumberFormat("en-PK", {
            style: "decimal"
        }).format(price) + " PKR";
    }
});
