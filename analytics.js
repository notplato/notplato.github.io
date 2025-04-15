// Track when the first element becomes visible in the viewport (IntersectionObserver)
const viewObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, view, ${entry.target.tagName.toLowerCase()}`);

            // Stop observing after first visibility
            //observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5 // Adjust the threshold as necessary
});

// Select and observe all elements on the page
const allElements = document.querySelectorAll('*'); // Select all elements (or you can target specific elements like 'div', 'section', etc.)

allElements.forEach(element => {
    viewObserver.observe(element); // Start observing each element
});

document.addEventListener('click', (event) => {
    const timestamp = new Date().toISOString();
    const element = event.target; // The element that was clicked
    const tagName = element.tagName.toLowerCase();

    // Log the clicked element
    console.log(`${timestamp}, click, ${tagName}`);
});