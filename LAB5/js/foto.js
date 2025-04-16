console.log("foto.js está cargado");
console.log("PHOTO_LIST:", PHOTO_LIST);

// Variables globales
const albumView = document.querySelector('#album-view');
const modalView = document.querySelector('#modal-view');

// Función para crear elementos de imagen
function createImage(src) {
    const image = document.createElement('img');
    image.src = src;
    image.loading = "lazy"; // Carga perezosa para mejor rendimiento
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
    
    // Limpiar modal y agregar nueva imagen
    modalView.innerHTML = '';
    modalView.appendChild(image);
    
    // Activar modal y deshabilitar scroll
    document.body.classList.add('no-scroll');
    modalView.classList.add('active');
    
    // Agregar evento para cerrar con ESC
    document.addEventListener('keydown', handleKeyDown);
}

// Función para cerrar el modal
function closeModal() {
    document.body.classList.remove('no-scroll');
    modalView.classList.remove('active');
    
    // Remover evento de teclado
    document.removeEventListener('keydown', handleKeyDown);
}

// Función para manejar teclado
function handleKeyDown(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

// Cargar imágenes en el álbum
function loadGallery() {
    PHOTO_LIST.forEach(photoSrc => {
        const image = createImage(photoSrc);
        image.addEventListener('click', onThumbnailClick);
        
        // Efecto de carga suave
        image.style.opacity = 0;
        image.style.transition = 'opacity 0.5s ease';
        image.onload = () => image.style.opacity = 1;
        
        albumView.appendChild(image);
    });
}

// Evento para cerrar modal al hacer clic
modalView.addEventListener('click', closeModal);

// Inicializar galería
loadGallery();