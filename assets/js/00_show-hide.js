// Show/hide the input area.
const toggleButton = document.getElementById("toggle-input");
const inputSection = document.getElementById("hidden");

if (toggleButton && inputSection) {
    toggleButton.addEventListener("click", () => {
        inputSection.hidden = !inputSection.hidden;
    });
}