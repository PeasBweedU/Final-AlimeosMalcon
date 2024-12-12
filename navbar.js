let lastScrollTop = 0; // Tracks the last scroll position
const nav = document.querySelector('nav'); // Select the navbar element

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down: hide the navbar
        nav.style.top = '-100px'; // Adjust to match your navbar's height
    } else {
        // Scrolling up: show the navbar
        nav.style.top = '0';
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll values
});

