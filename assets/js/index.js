"use strict";
const searchForm = document.getElementById("search-postcode");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let postcodeInput = document.getElementById("postcode-input");
  console.log(postcodeInput.value);
});

const Restaurant = class {
  constructor(name, address, cuisines, rating) {
    this.name = name;
    this._address = address;
    this.cuisines = cuisines;
    this.rating = rating;
  }
  get address() {
    return `${this._address.firstLine}, ${this._address.city}, ${this._address.postalCode}`;
  }
  cuisinesFormatted() {
    const cuisines1 = this.cuisines.map(function (restaurant) {
      console.log(restaurant.name);
    });
  }
  ratings() {
    return this.rating.count;
  }
};

const getRestaurantsByPostcode = function (postcode) {
  fetch(
    `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const firstTenResturants = data.restaurants.slice(0, 10);
      console.log(firstTenResturants);
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

        return formattedRestaurant;
      });
    });
};
