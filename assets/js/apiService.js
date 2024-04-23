import { getJSON } from "./utils.js";

export const getRestaurantsByPostcode = async function (postcode) {
  try {
    const data = await getJSON(
      `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
      "PostCode is not found"
    );
    if (!data.metaData.location) throw new Error("Postcode Not Found");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
