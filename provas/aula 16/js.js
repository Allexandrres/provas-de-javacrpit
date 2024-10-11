const breedsContainer = document.getElementById('breeds-container');
const imagesContainer = document.getElementById('images-container');
const loading = document.getElementById('loading');

async function fetchBreeds() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error fetching breeds:', error);
        showError();
    }
}

async function fetchImages(breed) {
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/4`);
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error fetching images:', error);
        showError();
    }
}

function showLoading() {
    loading.style.display = 'block';
}

function hideLoading() {
    loading.style.display = 'none';
}

function showError() {
    imagesContainer.innerHTML = 'An error occurred. Please try again later.';
}

async function displayBreeds() {
    showLoading();
    const breeds = await fetchBreeds();

    for (const breed in breeds) {
        const button = document.createElement('button');
        button.textContent = breed;
        button.addEventListener('click', async () => {
            showLoading();
            const images = await fetchImages(breed);
            displayImages(images);
            hideLoading();
        });
        breedsContainer.appendChild(button);
    }

    hideLoading();
}

function displayImages(images) {
    imagesContainer.innerHTML = '';

    images.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        imagesContainer.appendChild(img);
    });
}

displayBreeds();