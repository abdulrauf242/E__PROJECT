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
    // fetch("main.json")
    //     .then(response => response.json())
    //     .then(json => {
    //         const mainCards = document.getElementById("main-cards");
    //         mainCards.innerHTML = ""; // Clear existing cards

    //         json.forEach(item => {
    //             mainCards.innerHTML += `
    //                 <div class="card" style="width: 18rem;">
    //                     <img src="${item.img}" class="card-img-top" alt="${item.name}">
    //                     <div class="card-body">
    //                         <h5 class="card-title">${item.name}</h5>
    //                         <p class="card-text">${item.disc}</p>
    //                         <b><p class="card-text">Price: ${formatPrice(item.price)}</p></b> <br>
    //                         <a href="detail.html?id=${json[item].id}" class="btn btn-primary">Buy Now</a>
    //                     </div>
    //                 </div>`;
    //         });
    //     })
    //     .catch(error => console.error("Error fetching the JSON data:", error));

    // // Helper Function to Format Price
    // function formatPrice(price) {
    //     return new Intl.NumberFormat("en-PK", {
    //         style: "decimal"
    //     }).format(price) + " PKR";
    // }
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
              <b class="card-text">Price: ${formatPrice(item.price)}</b><br>
              <a href="detail.html?id=${item.id}" class="btn btn-primary">Buy Now</a>
            </div>
          </div>`;
            });
        })
        .catch(error => console.error("Error fetching the JSON data:", error));
    function formatPrice(price) {
        return `Rs. ${price.toLocaleString()}`;
    }

    // Number Count
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;

                    // Lower inc to slow and higher to slow
                    const inc = target / speed;

                    // Check if target is reached
                    if (count < target) {
                        // Add inc to count and output in counter
                        counter.innerText = Math.ceil(count + inc);
                        // Call function every ms
                        setTimeout(updateCount, 50);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
                observer.unobserve(counter); // Stop observing once the animation is done
            }
        });
    };

    const observer = new IntersectionObserver(animateCounters, {
        threshold: 0.5 // Adjust this value as needed
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });

    // Animation for sections
    const sections = document.querySelectorAll('.animated-section');

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.animated-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});
// mob active
function setActive(element) {
    const links = document.querySelectorAll('#nav-links li');
    links.forEach(link => link.classList.remove('active'));
    element.classList.add('active');
}

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('#nav-links-desktop a');
    const currentUrl = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentUrl)) {
            link.classList.add('active');
        }
    });
});
function setActive(element) {
    const links = document.querySelectorAll('.nav-links-desktop li');
    links.forEach(link => link.classList.remove('active'));
    element.parentElement.classList.add('active');
}

// Auto-activate the correct link on page load
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links-desktop a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.parentElement.classList.add('active');
        }
    });
});
//   
// function onlyAlphabets(event){
//     let char = String.fromCharCode(event.keyCode);
//     let regex = /^[A-Za-z]+$/;
//     return regex.test(char);
// }
// Check if geolocation is available in the browser
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation, showError);
} else {
    document.getElementById('location').textContent = "Geolocation is not supported by this browser.";
}

// Function to display location
function displayLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById('location').textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
}

// Function to handle errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location').textContent = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location').textContent = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('location').textContent = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location').textContent = "An unknown error occurred.";
            break;
    }
}
// Smooth Scroll
const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Offcanvas Menu
const menuToggle = document.getElementById("menu-toggle");
const closeBtn = document.getElementById("close-btn");
const offcanvasMenu = document.getElementById("offcanvas-menu");
const overlay = document.getElementById("overlay");
