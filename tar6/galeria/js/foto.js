console.log("foto.js está cargado");
console.log("PHOTO_LIST:", PHOTO_LIST);

// Variables globales
const albumView = document.querySelector('#album-view');
const modalView = document.querySelector('#modal-view');
let currentIndex = 0; // índice actual de la foto mostrada

// Función para crear elementos de imagen
function createImage(src) {
    const image = document.createElement('img');
    image.src = src;
    image.loading = "lazy";
    return image;
}

// Función para manejar clic en miniaturas
function onThumbnailClick(event) {
    const imageSrc = event.currentTarget.src;
    openModal(imageSrc);
}

// Función para abrir el modal
function openModal(imageSrc) {
    const image = createImage(imageSrc);

    modalView.innerHTML = '';
    modalView.appendChild(image);

    currentIndex = PHOTO_LIST.indexOf(imageSrc); // Guardar el índice actual

    document.body.classList.add('no-scroll');
    modalView.classList.add('active');

    document.addEventListener('keydown', handleKeyDown);
}

// Función para cerrar el modal
function closeModal() {
    document.body.classList.remove('no-scroll');
    modalView.classList.remove('active');

    document.removeEventListener('keydown', handleKeyDown);
}

// Función para manejar eventos del teclado
function handleKeyDown(event) {
    if (event.key === 'Escape') {
        closeModal();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        nextPhoto(event);
    }
}

// Función para avanzar o retroceder la foto en el modal
function nextPhoto(event) {
    if (event.key === 'ArrowLeft') {
        currentIndex--;
    } else if (event.key === 'ArrowRight') {
        currentIndex++;
    }
    //limites
    if (currentIndex < 0 || currentIndex >= PHOTO_LIST.length) {
        return;
    }

    const photoSrc = PHOTO_LIST[currentIndex];
    const image = createImage(photoSrc);

    modalView.innerHTML = '';
    modalView.appendChild(image);
}

// Función para cargar las imágenes en la galería
function loadGallery() {
    PHOTO_LIST.forEach(photoSrc => {
        const image = createImage(photoSrc);
        image.addEventListener('click', onThumbnailClick);

        image.style.opacity = 0;
        image.style.transition = 'opacity 0.5s ease';
        image.onload = () => image.style.opacity = 1;

        albumView.appendChild(image);
    });
}

// Evento para cerrar modal al hacer clic fuera de la imagen
modalView.addEventListener('click', closeModal);

// Inicializar la galería
loadGallery();
