document.addEventListener('DOMContentLoaded', () => {
    const imageElement = document.getElementById('carouselImage');
    const images = [
        'icons/Farmer 1.jpeg',
        'icons/Farmer 2.jpeg',
        'icons/Farmer 3.jpeg',
        'icons/Farmer 4.jpeg'
    ];

    let currentIndex = 0;

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        imageElement.src = images[currentIndex];
    }

    setInterval(showNextImage, 4000);

    // Fade-in + remove loader
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        const loader = document.getElementById('loader-wrapper');
        loader.style.display = 'none';
    });
});
