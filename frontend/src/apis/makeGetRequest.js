export async function makeGetRequest(url) {
  const options = {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      credentials: "include",
      Authorization: localStorage.getItem("acess_token"),
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
