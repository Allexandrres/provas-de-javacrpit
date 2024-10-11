async function obterRacas() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    return data.message;
}

async function exibirRacas() {
    const racas = await obterRacas();
    const racasContainer = document.getElementById('racas-container');

    for (const raca in racas) {
        const button = document.createElement('button');
        button.textContent = raca;
        button.addEventListener('click', async () => {
            const response = await fetch(`https://dog.ceo/api/breed/${raca}/images/random/4`);
            const data = await response.json();
            exibirImagens(data.message);
        });
        racasContainer.appendChild(button);
    }
}

function exibirImagens(imagens) {
    const imagensContainer = document.getElementById('imagens-container');
    imagensContainer.innerHTML = '';

    imagens.forEach(imagemUrl => {
        const img = document.createElement('img');
        img.src = imagemUrl;
        imagensContainer.appendChild(img);
    });
}

exibirRacas();