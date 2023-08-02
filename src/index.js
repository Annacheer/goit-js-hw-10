import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

function populateBreedsSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function showElement(elementToShow) {
  const elementsToHide = [breedSelect, loader, error, catInfo];
  elementsToHide.forEach(element => {
    if (element !== elementToShow) {
      element.style.display = "none";
    }
  });
  elementToShow.style.display = "block";
}

showElement(loader); 
fetchBreeds()
  .then(breeds => {
    populateBreedsSelect(breeds);
    showElement(breedSelect); 
  })
  .catch(() => {
    showElement(error);
  })
  .finally(() => {
    loader.style.display = "none"; 
  });


breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;
  showElement(loader);

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      const catDetails = `
        <div class="cat-details-container">
          <img src="${cat.url}" alt="${cat.breeds[0].name}" style="width: 300px;" />
          <div class="cat-details-text">
            <p class="name"><b>${cat.breeds[0].name}</b></p>
            <p>Description: ${cat.breeds[0].description}</p>
            <p><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
          </div>
        </div>
      `;
      catInfo.innerHTML = catDetails;
      showElement(catInfo);
    })
    .catch(() => {
      showElement(error);
    })
    .finally(() => {
      loader.style.display = "none"; 
      breedSelect.style.display = "block"; 
    });
});
