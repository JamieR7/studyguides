// IB SEHS MCQ Interactive Functionality
// Reveals answers when students click an option

document.addEventListener('DOMContentLoaded', function() {
    
    // Find all MCQ containers
    const mcqContainers = document.querySelectorAll('.mcq-container');
    
    mcqContainers.forEach(container => {
        
        // Get all option buttons and the answer box for this question
        const options = container.querySelectorAll('.mcq-options li');
        const answerBox = container.querySelector('.mcq-answer-box');
        
        // Hide answer box initially
        if (answerBox) {
            answerBox.style.display = 'none';
        }
        
        // Add click event to each option
        options.forEach(option => {
            option.addEventListener('click', function() {
                
                // Mark this option as selected
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                // Reveal the answer with smooth animation
                if (answerBox) {
                    answerBox.style.display = 'block';
                    answerBox.style.opacity = '0';
                    answerBox.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        answerBox.style.transition = 'all 0.4s ease';
                        answerBox.style.opacity = '1';
                        answerBox.style.transform = 'translateY(0)';
                    }, 10);
                    
                    // Scroll answer into view smoothly
                    setTimeout(() => {
                        answerBox.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }, 200);
                }
            });
        });
    });
    
    console.log('✅ MCQ interactions loaded successfully');
});
