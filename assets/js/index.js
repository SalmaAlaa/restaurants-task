"use strict";
const searchForm = document.getElementById("search-postcode");
const restaurantsContainer = document.querySelector(".restaurants");

const Restaurant = class {
  constructor(name, address, cuisines, rating) {
    this.name = name;
    this._address = address;
    this._cuisines = cuisines;
    this._rating = rating;
  }
  get address() {
    return `${this._address.firstLine}, ${this._address.city}, ${this._address.postalCode}`;
  }
  get cuisines() {
    return this._cuisines.map(function (cuisine) {
      return cuisine.name;
    });
  }
  get ratings() {
    return this._rating.count;
  }
};
// Restaurant.prototype.gaddress = function () {
//   return `${this.address.firstLine}, ${this.address.city}, ${this.address.postalCode}`;
// };
const getJSON = function (url, errorMessage = "Something Went Wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);
    console.log(response);
    return response.json();
  });
};
const renderRestaurants = function (restaurants) {
  console.log(restaurants);
  restaurantsContainer.innerHTML = "";

  for (const res of restaurants) {
    const html = `<article class="restaurant">
      <img class="restaurant__img" src="https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg" />
      <div class="restaurant__data">
        <h3 class="restaurant__name">${res.name}</h3>
        <p class="restaurant__row"><span>📍</span>${res.address}</p>
        <p class="restaurant__row"><span>🍽️</span>${res.cuisines}</p>
        <p class="restaurant__row"><span>⭐️</span>${res.ratings}</p>
      </div>
    </article>`;
    restaurantsContainer.insertAdjacentHTML("beforeend", html);
    // restaurantsContainer.style.opacity = 1;
  }
};
const RenderError = function (message) {
  restaurantsContainer.innerHTML = "";
  restaurantsContainer.insertAdjacentText("beforeend", message);
  // restaurantsContainer.style.opacity = 1;
};
const getRestaurantsByPostcode = function (postcode) {
  getJSON(
    `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
    "PostCode is not found"
  )
    .then(function (data) {
      if (data.metaData.location === null) {
        throw new Error("Postcode Not Found");
      }
      // console.log(data);
      const firstTenResturants = data.restaurants.slice(0, 10);
      // console.log(firstTenResturants);
      const formattedRestaurants = firstTenResturants.map(function (
        restaurant
      ) {
        const { name, address, cuisines, rating } = restaurant;
        const formattedRestaurant = new Restaurant(
          name,
          address,
          cuisines,
          rating
        );
        // console.log(formattedRestaurant);
        return formattedRestaurant;
      });
      renderRestaurants(formattedRestaurants);
    })
    .catch(function (error) {
      console.log(`${error}`);
      RenderError(
        `Something Wrong Happened, ${error.message}. Try  again later!`
      );
    })
    .finally(function () {
      restaurantsContainer.style.opacity = 1;
    });
};

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let postcodeInput = document.getElementById("postcode-input");
  getRestaurantsByPostcode(postcodeInput.value);
  // renderRestaurants(restaurants);
});
// getRestaurantsByPostcode("CT1 2EH");
