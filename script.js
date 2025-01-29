// Typing effect for the name with emoji after "Hey"
const nameElement = document.getElementById("name");
const nameText = "Hey, I am Dhanush Kumar Pulagoru ";
const emoji = "👋";
let index = 0;
let isEmojiAdded = false;  // Flag to track if the emoji has been added

function typeName() {
    if (index < nameText.length) {
        nameElement.innerHTML += nameText.charAt(index);
        index++;
        // Once "Hey" is typed, add the emoji
        if (!isEmojiAdded && index === 4) { // After typing "Hey" (index 4)
            nameElement.innerHTML += emoji;
            isEmojiAdded = true;
        }
        setTimeout(typeName, 100);
    }
}

window.onload = typeName;

// Add animations to sections
document.querySelectorAll("section").forEach((section, index) => {
    setTimeout(() => {
        section.classList.add("fadeIn");
    }, index * 500); // Add delay between sections
});

// Scroll to sections
document.querySelectorAll(".subsection-title").forEach(button => {
    button.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});
