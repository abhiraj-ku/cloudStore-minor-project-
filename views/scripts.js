// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation trigger on scroll
window.addEventListener('scroll', () => {
    document.querySelectorAll('.fadeIn').forEach(el => {
        const pos = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (pos < windowHeight - 100) {
            el.classList.add('active');
        }
    });
});
