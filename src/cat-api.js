import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_GamYBMZfnIQtf50MtSXy2yPwmucEDoiqIuwpS0PCsEyl9VdCsNnngNmAtHbgG9S9";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      throw new Error("Failed to fetch breeds.");
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      throw new Error("Failed to fetch cat information.");
    });
}
