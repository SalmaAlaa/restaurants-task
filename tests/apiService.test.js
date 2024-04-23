import { getRestaurantsByPostcode } from "../assets/js/apiService.js";
import { getJSON } from "../assets/js/utils.js";

jest.mock("../assets/js/utils.js");

describe("getRestaurantsByPostcode", () => {
  test("get restaurants when postcode is valid", async () => {
    // Arrange
    const postcode = "12345";
    const mockData = {
      metaData: { location: "Mock Location" },
      restaurants: [],
    };
    getJSON.mockResolvedValue(mockData);

    // Act
    const data = await getRestaurantsByPostcode(postcode);

    // Assert
    expect(data).toEqual(mockData);
    expect(getJSON).toHaveBeenCalledWith(
      `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
      "PostCode is not found"
    );
  });

  test("throws an error when location is null", async () => {
    // Arrange
    const postcode = "12345";
    const mockData = {
      metaData: { location: null },
      restaurants: [],
    };
    getJSON.mockResolvedValue(mockData);

    // Act & Assert
    await expect(getRestaurantsByPostcode(postcode)).rejects.toThrow(
      "Postcode Not Found"
    );
    expect(getJSON).toHaveBeenCalledWith(
      `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
      "PostCode is not found"
    );
  });

  test("throws error for invalid postcode", async () => {
    // Arrange
    const postcode = "invalid";
    const errorMessage = "Postcode Not Found";
    const mockError = new Error(errorMessage);
    getJSON.mockRejectedValue(mockError);

    // Act & Assert
    await expect(getRestaurantsByPostcode(postcode)).rejects.toThrow(
      errorMessage
    );
    expect(getJSON).toHaveBeenCalledWith(
      `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
      "PostCode is not found"
    );
  });
});
