import { getJSON } from "../assets/js/utils.js";

describe("getJSON", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test("fetch successfully for valid URL", async () => {
    // Arrange
    const url = "https://example.com/api";
    const mockData = { foo: "bar" };
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockData),
    };
    global.fetch.mockResolvedValue(mockResponse);

    // Act
    const data = await getJSON(url);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(url);
    expect(data).toEqual(mockData);
  });

  test("throws error for unsuccessful response with default error message", async () => {
    // Arrange
    const url = "https://example.com/api";
    const mockResponse = {
      ok: false,
      status: 404,
      json: jest.fn().mockResolvedValue({}),
    };
    global.fetch.mockResolvedValue(mockResponse);

    // Act & Assert
    await expect(getJSON(url)).rejects.toThrow("Something Went Wrong (404)");
    expect(global.fetch).toHaveBeenCalledWith(url);
    expect(mockResponse.json).toHaveBeenCalled();
  });

  test("throw error with custom error message if provided", async () => {
    // Arrange
    const url = "https://example.com/api";
    const customErrorMessage = "custom message";
    const mockResponse = {
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({}),
    };
    global.fetch.mockResolvedValue(mockResponse);

    // Act & Assert
    await expect(getJSON(url, customErrorMessage)).rejects.toThrow(
      `${customErrorMessage} (500)`
    );
    expect(global.fetch).toHaveBeenCalledWith(url);
    expect(mockResponse.json).toHaveBeenCalled();
  });
});
