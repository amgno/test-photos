const galleryContainer = document.getElementById('main-gallery');
const detailsContainer = document.createElement('div');
detailsContainer.id = 'details-container';
document.body.appendChild(detailsContainer);

function updateGallery(images) {
    galleryContainer.innerHTML = '';
    images.forEach((image, index) => {
        const galleryElement = document.createElement('div');
        galleryElement.classList.add('galleryelement');

        const xy2 = document.createElement('xy2');
        xy2.innerHTML = `${index + 1}`;
        galleryElement.appendChild(xy2);

        const img = document.createElement('img');
        img.src = image.url;
        img.alt = '';
        img.classList.add('hoverImage');
        galleryElement.appendChild(img);

        galleryElement.addEventListener('click', function () {
            showDetails(image);
        });

        galleryContainer.appendChild(galleryElement);
    });
}

function showDetails(image) {
    getImageColor(image.url).then(color => {
        document.body.style.backgroundColor = color;
    });

    detailsContainer.innerHTML = `
        <div class="details-image">
            <img src="${image.url}" alt="">
        </div>
        <div class="details-info">
            <div>${image.shotWith}</div>
            <div>${image.date}</div>
            <div>${image.where}</div>
        </div>
    `;
    detailsContainer.style.display = 'block';
}

function getImageColor(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Ensure the image can be accessed from the canvas
        img.src = imageUrl;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            let r = 0, g = 0, b = 0;

            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
            }

            r = Math.floor(r / (data.length / 4));
            g = Math.floor(g / (data.length / 4));
            b = Math.floor(b / (data.length / 4));

            resolve(`rgb(${r}, ${g}, ${b})`);
        };

        img.onerror = function () {
            reject(new Error('Failed to load image'));
        };
    });
}

function sortImagesByDate(images) {
    return images.sort((a, b) => new Date(b.date.split(' ').reverse().join('-')) - new Date(a.date.split(' ').reverse().join('-')));
}

document.getElementById('filter').addEventListener('click', function () {
    const sortedImages = sortImagesByDate(images);
    updateGallery(sortedImages);
});

updateGallery(images);