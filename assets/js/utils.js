export const getJSON = async function (
  url,
  errorMessage = "Something Went Wrong"
) {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);
  return data;
};
