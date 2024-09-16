// let inp = document.getElementById("inp")
// let btn = document.getElementById("btn")
// let text = document.getElementById("text")
// let img = document.getElementById("img")
// btn.addEventListener("click", () => {
//     fetch("https://66e7e69ab17821a9d9da6e9d.mockapi.io/logIn", {


//         method: 'POST',
//         body: JSON.stringify({


//             name: inp.value,
//             img: img.value,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
        
//     }
// }
// )
//     .then((response) => response.json()
//         .then(data =>
//             text.innerText = data.name
//         )
//     )
// })





const apiUrl = 'https://66e7e6bbb17821a9d9da704c.mockapi.io/login';
function fetchImages() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                console.error('Error fetching images:', response.status);
                return;
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                displayImages(data);
            }
        });
}

function displayImages(images) {
    const container = document.getElementById('images-container');
    container.innerHTML = '';

    images.forEach(image => {
        const imageElement = document.createElement('div');
        imageElement.className = 'image-card'; 
        imageElement.innerHTML = `
            <h3>${image.name}</h3>
            <img src="${image.url}" alt="${image.name}" style="max-width: 200px;">
            <button onclick="deleteImage(${image.id})">Delete</button>
        `;
        container.appendChild(imageElement);
    });
}


function addImage() {
    const name = document.getElementById('image-name').value;
    const url = document.getElementById('image-url').value;

    if (name && url) {
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, url })
        })
        .then(response => {
            if (!response.ok) {
                console.error('Error adding image:', response.status);
                return;
            }
            return response.json();
        })
        .then(() => {
            fetchImages();
        });
    } else {
        alert('Please provide both name and URL for the image.');
    }
}

function deleteImage(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            console.error('Error deleting image:', response.status);
        } else {
            console.log(`Image with ID ${id} deleted from the database.`);
        }
    });
}


fetchImages();
