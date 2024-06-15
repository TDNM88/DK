// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the close button element by its ID
    var closeButton = document.getElementById('close-button');

    // Add a click event listener to the close button
    closeButton.addEventListener('click', function() {
        // Get the welcome message element by its ID
        var welcomeMessage = document.getElementById('welcome-message');

        // Set the display style of the welcome message to 'none' to hide it
        welcomeMessage.style.display = 'none';
    });
});
