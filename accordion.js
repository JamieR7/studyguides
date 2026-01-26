/**
 * Accordion Logic
 * Handles the opening and closing of topic sections.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Select all headers (both main and sub)
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', (e) => {
            // Stop click from bubbling up to parent accordions
            e.stopPropagation();

            // Find the parent card for THIS header
            // (We look for the closest '.topic-accordion-card' OR '.sub-accordion-card')
            const card = header.closest('.topic-accordion-card, .sub-accordion-card');

            if (card) {
                card.classList.toggle('active');
            }
        });
    });
});
