const restaurantsContainer = document.querySelector(".restaurants-container");
const errorContainer = document.querySelector(".error-container");

function createRestaurantHTML(res) {
  const cuisinesHTML = res.cuisines
    .map((cuisine) => `<span class="badge">${cuisine}</span>`)
    .join("");

  return `<article class="restaurant">
    <img src="assets/images/restaurant_cover.jpg" alt="Restaurant Image">
    <div class="restaurant-details">
      <p class="restaurant-name">
        <span class="icon">🍽️</span> 
        <span class="text">${res.name}</span>
      </p>
      <p class="restaurant-location">
        <span class="icon">📍</span> 
        <span class="text">${res.address}</span>
      </p>
      <p class="restaurant-rating">
        <span class="icon">⭐️</span> 
        <span class="text">${res.ratings}</span>
      </p>
      <p class="restaurant-cuisines">
        <span class="icon">🍴</span> 
        <span class="text badge-container">
          ${cuisinesHTML}
        </span>
      </p>
    </div>
  </article>`;
}

function cleanupContainers() {
  errorContainer.innerHTML = "";
  restaurantsContainer.innerHTML = "";
}

export function renderRestaurants(restaurants) {
  cleanupContainers();
  for (const restaurant of restaurants) {
    const html = createRestaurantHTML(restaurant);
    restaurantsContainer.insertAdjacentHTML("beforeend", html);
  }
}

export function renderError(message) {
  cleanupContainers();
  errorContainer.innerHTML = `<div class="alert">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        ${message}
    </div>`;
}
