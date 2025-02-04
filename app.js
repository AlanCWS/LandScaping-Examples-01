// 1. Hamburger Menu
const hamburger = document.getElementById('hamburger');
if (hamburger) {
    hamburger.addEventListener('click', function () {
        const navLinks = document.getElementById('nav-links');
        if (navLinks) {
            navLinks.classList.toggle('active');
        }
    });
} else {
    console.error("Hamburger menu button not found.");
}

// 2. Reviews Scrolling
const reviewsContainer = document.querySelector('.reviews-container');
const reviewCards = document.querySelectorAll('.review-card');
if (reviewsContainer && reviewCards.length > 0) {
    const cardWidth = reviewCards[0].offsetWidth;
    const totalCards = reviewCards.length;
    const containerWidth = cardWidth * totalCards;

    setInterval(() => {
        if (reviewsContainer.scrollLeft + reviewsContainer.offsetWidth < containerWidth) {
            reviewsContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
        } else {
            setTimeout(() => {
                reviewsContainer.scrollTo({ left: 0, behavior: 'auto' });
            }, 500);
        }
    }, 5000);
} else {
    console.error('Reviews container or cards not found.');
}

// 3. Seamless Scrolling
const scrollContent = document.querySelector('.scroll-content');
if (scrollContent) {
    const clonedContent = scrollContent.cloneNode(true);
    scrollContent.parentNode.appendChild(clonedContent);
}

// 4. Customer Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const jsonData = {};

        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        if (!jsonData.access_key) {
            console.error("Missing Web3Forms Access Key.");
            return;
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: jsonData.access_key,
                    subject: 'New Customer Message',
                    ...jsonData,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Your message has been sent successfully!');
                e.target.reset();
            } else {
                console.error('Error:', result);
                alert('Failed to send your message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending your message. Please try again.');
        }
    });
}

// 5. Image Carousels
const carousels = document.querySelectorAll('[data-carousel]');
if (carousels.length > 0) {
    carousels.forEach(carousel => {
        const carouselImages = carousel.querySelector('.carousel-images');
        const prevButton = carousel.querySelector('.carousel-button.prev');
        const nextButton = carousel.querySelector('.carousel-button.next');

        if (!carouselImages || !prevButton || !nextButton) {
            console.error('Carousel elements are missing:', carousel);
            return;
        }

        let currentIndex = 0;
        let intervalId = null;
        const intervalTime = parseInt(carousel.getAttribute('data-interval'), 10) || 3000;
        const imagesLoaded = () => carouselImages.children.length > 0;

        function showImage(index) {
            if (imagesLoaded()) {
                currentIndex = (index + carouselImages.children.length) % carouselImages.children.length;
                carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;
            }
        }

        function startAutoScroll() {
            stopAutoScroll();
            intervalId = setInterval(() => {
                showImage(currentIndex + 1);
            }, intervalTime);
        }

        function stopAutoScroll() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

        prevButton.addEventListener('click', () => {
            stopAutoScroll();
            showImage(currentIndex - 1);
        });

        nextButton.addEventListener('click', () => {
            stopAutoScroll();
            showImage(currentIndex + 1);
        });

        carousel.addEventListener('mouseenter', stopAutoScroll);
        carousel.addEventListener('mouseleave', startAutoScroll);

        startAutoScroll();
    });
} else {
    console.error('No carousels found in the document.');
}
