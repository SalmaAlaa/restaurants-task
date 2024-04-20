'use strict';
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
// Restaurant.prototype.gaddress = function () {
//   return `${this.address.firstLine}, ${this.address.city}, ${this.address.postalCode}`;
// };
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
        console.log(formattedRestaurant);
        // formattedRestaurant.cuisinesFormatted();
        //console.log(formattedRestaurant.ratings());

        //console.log(formattedRestaurant.address);

        return formattedRestaurant;
      });
      //   console.log(formattedRestaurants);
      //   for (const restaurant of formattedRestaurants) {
      //     // console.log(restaurant);
      //     // console.log(name, address, cuisines, rating);

      //     console.log(RestaurantInstance);
      //   }
    });
};
getRestaurantsByPostcode('CT1 2EH');
