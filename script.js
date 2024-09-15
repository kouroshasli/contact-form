document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('country-code');
    const countrySearch = document.getElementById('country-search');
    const form = document.querySelector('.contact-form');
    const responseMessage = document.getElementById('response-message');
    
    // Convert options to array
    const countries = Array.from(countrySelect.options);

    // Function to update country options based on search
    function filterCountries() {
        const searchTerm = countrySearch.value.toLowerCase();
        countries.forEach(option => {
            option.style.display = option.textContent.toLowerCase().includes(searchTerm) ? 'block' : 'none';
        });
    }

    // Event listener for search input
    countrySearch.addEventListener('input', filterCountries);

    // CAPTCHA functionality
    const captchaCanvas = document.getElementById('captcha-canvas');
    const captchaInput = document.getElementById('captcha');
    const refreshCaptchaButton = document.getElementById('refresh-captcha');
    let captchaCode = '';

    function generateCaptcha() {
        const ctx = captchaCanvas.getContext('2d');
        captchaCanvas.width = 100;
        captchaCanvas.height = 30;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, captchaCanvas.width, captchaCanvas.height);
        ctx.fillStyle = '#000';
        ctx.font = '24px Arial';
        captchaCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        ctx.fillText(captchaCode, 10, 25);
    }

    refreshCaptchaButton.addEventListener('click', generateCaptcha);
    generateCaptcha();

    // Form submission handling
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (captchaInput.value.toUpperCase() === captchaCode) {
            responseMessage.textContent = 'Your message has been sent successfully!';
            responseMessage.classList.remove('hidden');
            form.reset();
            generateCaptcha(); // Generate a new CAPTCHA after successful submission
        } else {
            responseMessage.textContent = 'Invalid CAPTCHA code. Please try again.';
            responseMessage.classList.remove('hidden');
        }
    });
});
