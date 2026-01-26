/**
 * Accordion Logic
 * Handles the opening and closing of topic sections.
 */
document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.topic-accordion-card');

    accordions.forEach(card => {
        const header = card.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            // Option 1: Allow multiple open (User preference likely, easier for comparison)
            card.classList.toggle('active');

            // Option 2: Accordion behavior (Close others)
            // Uncomment below if single-open behavior is desired
            /*
            accordions.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                }
            });
            */
        });
    });
});
