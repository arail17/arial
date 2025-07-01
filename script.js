// Hero content data for rotation
const heroContent = [
    {
        title: "Hi, I’m Arial",
        badge: "GRAPHIC DESIGNER",
        language: "ENGLISH | HINDI",
        rating: "5.0 ⭐",
        description: "Hi, I’m Arial — a graphic designer who turns ideas into clean, bold visuals. I create logos, branding, and digital designs that help you stand out. Let’s build something creative together!",
        background: "https://t3.ftcdn.net/jpg/02/98/11/76/240_F_298117627_neaI5EvfL3VGOPHKevRhUkTK1i7l9man.jpg"
    },
    {
        title: "Brand Identity Creation",
        badge: "FEATURED WORK",
        language: "GLOBAL",
        rating: "4.8 ⭐",
        description: "Specializing in crafting unique and memorable brand identities that resonate with your audience and leave a lasting impression.",
        background: "https://cdn.pixabay.com/photo/2012/06/25/15/41/berlin-wall-50730_640.jpg"
    },
    {
        title: "Dynamic Digital Campaigns",
        badge: "NEW PROJECTS",
        language: "ENGLISH",
        rating: "4.9 ⭐",
        description: "Designing engaging digital campaigns, from social media graphics to web banners, that capture attention and drive results.",
        background: "https://cdn.pixabay.com/photo/2015/04/29/09/28/graffiti-745071_1280.jpg"
    },
    {
        title: "Print & Editorial Design",
        badge: "PORTFOLIO HIGHLIGHT",
        language: "MULTILINGUAL",
        rating: "4.7 ⭐",
        description: "Expertise in creating visually stunning print materials, including brochures, flyers, and editorial layouts.",
        background: "https://cdn.pixabay.com/photo/2015/04/29/09/28/graffiti-745071_1280.jpg" // Reusing an image, consider replacing
    },
    {
        title: "Custom Illustrations",
        badge: "CREATIVE SERVICES",
        language: "ANY",
        rating: "5.0 ⭐",
        description: "Bringing ideas to life with bespoke illustrations tailored to your brand's unique story and aesthetic.",
        background: "https://cdn.pixabay.com/photo/2015/04/29/09/28/graffiti-745072_1280.jpg" // Reusing an image, consider replacing
    }
];

let currentSlide = 0;
let slideInterval;

// Elements
const heroSection = document.getElementById('hero-section');
const heroContentEl = document.getElementById('hero-content');
const contentBadge = document.getElementById('content-badge');
const heroTitle = document.getElementById('hero-title');
const languageInfo = document.getElementById('language-info');
const heroDescription = document.getElementById('hero-description');
const heroRating = document.getElementById('hero-rating');
const indicators = document.querySelectorAll('.indicator');
const header = document.getElementById('header');

// Update hero content and background
function updateHeroContent(index) {
    const content = heroContent[index];

    // Add fade out effect for content
    heroContentEl.style.opacity = '0';
    heroContentEl.style.transform = 'translateY(20px)'; // Smaller translate for subtler effect

    setTimeout(() => {
        // Update content
        contentBadge.textContent = content.badge || 'CREATIVE WORK'; // Default if badge is missing
        heroTitle.textContent = content.title;
        languageInfo.textContent = content.language || ''; // Handle missing language info
        heroDescription.textContent = content.description;
        heroRating.textContent = content.rating || '';

        // Update background
        heroSection.style.backgroundImage = `url('${content.background}')`;

        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        // Fade in effect for content
        heroContentEl.style.opacity = '1';
        heroContentEl.style.transform = 'translateY(0)';
    }, 300); // Shorter timeout for quicker transition
}

// Start slideshow
function startSlideshow() {
    stopSlideshow(); // Clear any existing interval
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % heroContent.length;
        updateHeroContent(currentSlide);
    }, 5000); // Increased interval to 5 seconds
}

// Stop slideshow
function stopSlideshow() {
    clearInterval(slideInterval);
}

// Initialize
updateHeroContent(0);
startSlideshow();

// Indicator click handlers
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        updateHeroContent(currentSlide);
        stopSlideshow();
        startSlideshow(); // Restart the timer
    });
});

// Pause slideshow on hover
heroSection.addEventListener('mouseenter', stopSlideshow);
heroSection.addEventListener('mouseleave', startSlideshow);

// Header scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Fade-in effect for content sections on scroll
    document.querySelectorAll('.content-section').forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        if (sectionTop < screenHeight * 0.8) { // When 80% of the section is visible
            section.classList.add('visible');
        } else {
            section.classList.remove('visible'); // Optional: remove if scrolled away
        }
    });
});


// Content item hover effects (click to view details)
document.querySelectorAll('.content-item').forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('.content-title')?.textContent || 'Selected Content';
        console.log(`Navigating to details for: ${title}`);
        // In a real application, you would navigate to a new page or open a modal
        // window.location.href = `/project/${encodeURIComponent(title.toLowerCase().replace(/\s/g, '-'))}`;
    });
});

// Smooth horizontal scrolling for content rows (draggable)
document.querySelectorAll('.content-row').forEach(row => {
    let isDown = false;
    let startX;
    let scrollLeft;

    row.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - row.offsetLeft;
        scrollLeft = row.scrollLeft;
        row.style.cursor = 'grabbing';
    });

    row.addEventListener('mouseleave', () => {
        isDown = false;
        row.style.cursor = 'grab';
    });

    row.addEventListener('mouseup', () => {
        isDown = false;
        row.style.cursor = 'grab';
    });

    row.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - row.offsetLeft;
        const walk = (x - startX) * 1.5; // Adjust scroll speed
        row.scrollLeft = scrollLeft - walk;
    });
});