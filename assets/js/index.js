import Restaurant from "./model.js";
import { getRestaurantsByPostcode } from "./apiService.js";
import { renderRestaurants, renderError } from "./ui.js";

const searchForm = document.getElementById("search-postcode");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const postcodeInput = document.getElementById("postcode-input").value;

  try {
    const data = await getRestaurantsByPostcode(postcodeInput);
    const formattedRestaurants = data.restaurants
      .slice(0, 10)
      .map(
        ({ name, address, cuisines, rating }) =>
          new Restaurant(name, address, cuisines, rating)
      );
    renderRestaurants(formattedRestaurants);
  } catch (error) {
    renderError(`Something Wrong Happened, ${error.message}. Try again later!`);
  }
});
