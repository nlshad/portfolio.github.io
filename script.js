const roles = ["Graphic Designer", "Wordpress Developer", "SEO Expert", "UI UX Designer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const textElement = document.querySelector('.changing-text');

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    // Determine the text to show based on typing or deleting
    if (isDeleting) {
        textElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    // Adjust typing speeds
    let typeSpeed = isDeleting ? 50 : 100;

    // Logic for pausing at the end of a word or moving to the next
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause for 2 seconds when the word is fully typed
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; // Move to the next role in the array
        typeSpeed = 500; // Pause for half a second before typing the next word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the animation when the page loads
document.addEventListener("DOMContentLoaded", () => {
    if(textElement) {
        textElement.textContent = ""; // Clear initial text
        typeEffect();
    }
});

/* --- Mobile Menu Toggle --- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        // Toggle the active class on both the button and the menu
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('show-menu');
    });

    // Optional: Close the menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('show-menu');
        });
    });
}
/* --- Resume Modal Logic --- */
const resumeTriggers = document.querySelectorAll('.resume-trigger');
const resumeModal = document.getElementById('resumeModal');
const closeResumeModal = document.getElementById('closeResumeModal');

if (resumeModal) {
    // Open Modal when "Resume" is clicked
    resumeTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents the page from jumping to top
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stops the background website from scrolling
        });
    });

    // Close Modal when the "X" button is clicked
    closeResumeModal.addEventListener('click', () => {
        resumeModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Turns scrolling back on
    });

    // Close Modal if you click outside the window (on the dark background)
    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}